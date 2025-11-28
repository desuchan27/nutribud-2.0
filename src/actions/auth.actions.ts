"use server";

import { loginUserSchema, registerUserSchema } from "@/schema";
import db from "@/lib/db";
import * as z from "zod";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { logFailedLogin, logSuccessfulLogin, logRateLimitViolation } from "@/lib/logger";

export const register = async (values: z.infer<typeof registerUserSchema>) => {
  try {
    const { email, firstName, lastName, username, password, confirmPassword } =
      values;

    // Rate limiting: 5 registrations per 15 minutes per email
    const rateLimitResult = rateLimit(`register:${email}`, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!rateLimitResult.success) {
      logRateLimitViolation(`register:${email}`, "register");
      return {
        error: `Too many registration attempts. Please try again in ${rateLimitResult.retryAfter} seconds.`,
      };
    }

    // Check if email or username exists in a single query to prevent timing attacks
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    // Use generic error message to prevent enumeration
    if (existingUser) {
      if (existingUser.email === email) {
        return { error: "An account with this email or username already exists" };
      }
      if (existingUser.username === username) {
        return { error: "An account with this email or username already exists" };
      }
    }

    // check if password matches
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    // Password strength validation is handled by Zod schema
    // No need to duplicate validation here

    const hashedPassword = await new Argon2id().hash(password);

    await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        username,
        password: hashedPassword,
      },
    });

  } catch (error) {
    // Log detailed error server-side, return generic message to client
    console.error("Registration error:", error);
    if (error instanceof Error) {
      // In production, use generic error messages
      const isProduction = process.env.NODE_ENV === "production";
      return { 
        error: isProduction 
          ? "An error occurred during registration. Please try again." 
          : error.message 
      };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
};

export const login = async (values: z.infer<typeof loginUserSchema>) => {
  const { email, password } = values;

  // Rate limiting: 5 login attempts per 15 minutes per email
  const rateLimitResult = rateLimit(`login:${email}`, {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  });

  if (!rateLimitResult.success) {
    logRateLimitViolation(`login:${email}`, "login");
    return {
      error: `Too many login attempts. Please try again in ${rateLimitResult.retryAfter} seconds.`,
    };
  }

  const existingUser = await db.user.findFirst({
    where: {
      email,
    }
  })

  // Use generic error message to prevent email enumeration
  // Always perform password verification to prevent timing attacks
  if (!existingUser) {
    // Still hash a dummy password to prevent timing attacks
    await new Argon2id().hash("dummy");
    logFailedLogin(email, "User not found");
    return { error: "Invalid email or password" }
  }

  const validPassword = await new Argon2id().verify(existingUser.password, password)

  if (!validPassword) {
    logFailedLogin(email, "Invalid password");
    return {
      error: "Invalid email or password"
    }
  }

  logSuccessfulLogin(existingUser.id, email);

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = await lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)


  const userInfo = await db.userInfo.findFirst({
    where: {
      userId: existingUser.id
    }
  })

  if (!userInfo){
    return redirect(`/onboarding/${existingUser.id}`)
  } else {
    return redirect("/home");
  }
}

export const logout = async () => {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: "No session found"
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect("/login")
}
