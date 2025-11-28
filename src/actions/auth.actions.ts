"use server";

import { loginUserSchema, registerUserSchema } from "@/schema";
import db from "@/lib/db";
import * as z from "zod";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";

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
      return {
        error: `Too many registration attempts. Please try again in ${rateLimitResult.retryAfter} seconds.`,
      };
    }

    // check if email exists
    const existingUserEmail = await db.user.findFirst({
      where: { email },
    });

    if (existingUserEmail) {
      return { error: "Email already exists" };
    }

    // check if username exists
    const existingUserUsername = await db.user.findFirst({
      where: { username },
    });

    if (existingUserUsername) {
      return { error: "Username already exists" };
    }

    // check if password matches
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    //PASSWORD STRENGTH VALIDATION
    if (password.length < 8) {
      return { error: "Password must be at least 8 characters long" };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { error: "Password must contain at least one lowercase letter" };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { error: "Password must contain at least one uppercase letter" };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { error: "Password must contain at least one number" };
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      return { error: "Password must contain at least one special character" };
    }

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
    if (error instanceof Error) {
      return { error: error.message };
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
    return { error: "Invalid email or password" }
  }

  const validPassword = await new Argon2id().verify(existingUser.password, password)

  if (!validPassword) {
    return {
      error: "Invalid email or password"
    }
  }

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
