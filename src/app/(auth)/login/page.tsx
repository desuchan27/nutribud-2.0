"use client";

import * as z from "zod";
import { AuthContainer } from "@/components/containers/AuthContainer";
import { loginUserSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { login } from "@/actions/auth.actions";

// Login form for cybersecurity training - this is where we'll test authentication vulnerabilities
export default function LoginPage() {
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const errorEmail = form.formState.errors.email;
  const errorPassword = form.formState.errors.password;

  const errorMessage = "text-sm text-red-500 font-semibold text-right";

  const onSubmit = (values: z.infer<typeof loginUserSchema>) => {
    console.log(values);

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          form.reset();
          console.log(data.error);
        } else {
          toast.success("Login successful! Redirecting to dashboard...");
        }
      });
    });
  };

  return (
    <AuthContainer>
      {/* Cybersecurity Training Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cybersecurity Training Portal</h1>
        <p className="text-gray-600 mt-2">Practice identifying authentication vulnerabilities in a safe environment</p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full"
      >
        {/* Email Input Field */}
        <span className="flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            placeholder="Enter your email address"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errorEmail && (
            <span className={errorMessage}>{errorEmail.message}</span>
          )}
        </span>

        {/* Password Input Field */}
        <span className="flex-col gap-2">
          <input
            {...form.register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errorPassword && (
            <span className={errorMessage}>{errorPassword.message}</span>
          )}
        </span>

        {/* Forgot Password Link (commented out but available for future use) */}
        {/* <a href="#" className="text-right font-semibold hover:text-underline hover:text-primary transition-hover duration-200">
          Forgot your password?
        </a> */}

        {/* Login/Sign In Button */}
        <button
          type="submit"
          className="w-full px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign In to Security Lab
        </button>

        {/* Registration Link */}
        <p className="place-self-center text-gray-700">
          New to our security lab?
          <Link
            href="/register"
            className="ml-2 font-semibold text-primary hover:underline transition-all duration-200"
          >
            Create Research Account
          </Link>
        </p>
      </form>

      {/* Security Notice for Educational Context */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          <strong>Educational Purpose:</strong> This system contains intentional vulnerabilities for training. 
          Never use real passwords from your personal accounts.
        </p>
      </div>
    </AuthContainer>
  );
}
