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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full"
      >
        <span className="flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            placeholder="Email"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75"
          />
          {errorEmail && (
            <span className={errorMessage}>{errorEmail.message}</span>
          )}
        </span>
        <span className="flex-col gap-2">
          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75"
          />
          {errorPassword && (
            <span className={errorMessage}>{errorPassword.message}</span>
          )}
        </span>
        {/* <a href="#" className="text-right font-semibold hover:text-underline hover:text-primary transition-hover duration-200">
          Forgot your password?
        </a> */}
        <button
          type="submit"
          className="w-full px-8 py-4 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-hover duration-200"
        >
          Login
        </button>
        <p className="place-self-center">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="ml-2 font-semibold hover:text-underline hover:text-primary transition-hover duration-200"
          >
            Sign-up
          </Link>
        </p>
      </form>
    </AuthContainer>
  );
}
