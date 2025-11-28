"use server";

import { loginUserSchema, registerUserSchema } from "@/schema";
import db from "@/lib/db";
import * as z from "zod";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";

// === RATE LIMITING MAP ===
const loginAttempts = new Map<string, number>();

export const register = async (values: z.infer<typeof registerUserSchema>) => {
  try {
    const { email, firstName, lastName, username, password, confirmPassword } =
      values;

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

  // === RATE LIMITING CHECK ===
  const attempts = loginAttempts.get(email) || 0;
  if (attempts >= 5) {
    return { error: "Too many login attempts. Try again in 15 minutes." };
  }
  loginAttempts.set(email, attempts + 1);
  setTimeout(() => {
    const current = loginAttempts.get(email);
    if (current) loginAttempts.set(email, current - 1);
  }, 15 * 60 * 1000); // 15 minutes

  const existingUser = await db.user.findFirst({
    where: {
      email,
    }
  })

  if (!existingUser) {
    return { error: "Invalid Email/Doesn't exist" }
  }

  const validPassword = await new Argon2id().verify(existingUser.password, password)

  if (!validPassword) {
    return {
      error: "Password is incorrect"
    }
  }

  // Reset rate limit on successful login
  loginAttempts.set(email, 0);

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
