"use client";

import Link from "next/link";

import { startTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUserSchema } from "@/schema";

import { AuthContainer } from "@/components/containers/AuthContainer";
import { register } from "@/actions/auth.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const errorFirstName = form.formState.errors.firstName;
  const errorLastName = form.formState.errors.lastName;
  const errorEmail = form.formState.errors.email;
  const errorUsername = form.formState.errors.username;
  const errorPassword = form.formState.errors.password;
  const errorConfirmPassword = form.formState.errors.confirmPassword;

  const errorMessage = "text-sm text-red-500 font-semibold text-right";
  const normalMessage = "text-sm text-zinc-700";

  const onSubmit = (values: z.infer<typeof registerUserSchema>) => {
    console.log(values);

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          form.reset();
          console.log(data.error);
        } else {
          toast.success("Registration successful! Redirecting to login...");
          router.push("/login");
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
        {/* Name */}
        <span className="flex flex-col md:flex-row gap-4">
          {/* First Name */}
          <span className="flex flex-col gap-2">
            <label htmlFor="name" className={normalMessage}>
              {errorFirstName ? (
                <span className={errorMessage}>
                  {errorFirstName.message}
                </span>
              ) : (
                <span>First Name</span>
              )}
            </label>
            <input
              {...form.register("firstName")}
              placeholder="Mary Elizabeth"
              className="w-full px-8 py-4 rounded-md bg-gray-200/75"
            />
          </span>

          {/* Last Name */}
          <span className="flex flex-col gap-2">
            <label htmlFor="name" className={normalMessage}>
              {errorLastName ? (
                <span className={errorMessage}>
                  {errorLastName.message}
                </span>
              ) : (
                <span>Last Name</span>
              )}
            </label>
            <input
              {...form.register("lastName")}
              type="name"
              placeholder="Smith"
              className="w-full px-8 py-4 rounded-md bg-gray-200/75"
            />
          </span>
        </span>

        {/* Email */}
        <span className="flex flex-col gap-2">
          <label htmlFor="email" className={normalMessage}>
            {errorEmail ? (
              <span className={errorMessage}>
                {errorEmail.message}
              </span>
            ) : (
              <span>Email</span>
            )}
          </label>
          <input
            {...form.register("email")}
            type="email"
            placeholder="maryelizabeth.smith@gmail.com"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75"
          />
        </span>

        {/* Username */}
        <span className="flex flex-col gap-2">
          <label htmlFor="username" className={normalMessage}>
            Username
          </label>
          <input
            {...form.register("username")}
            placeholder="@marysmith"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75"
          />

          {errorUsername ? (
            <p className="text-sm text-red-500 font-semibold text-right">
              {errorUsername.message}
            </p>
          ) : (
            <p className="text-sm text-right pr-2 text-zinc-700">
              Minimum of 6 characters, Maximum of 20 characters
            </p>
          )}
        </span>

        {/* Password */}
        <span className="flex flex-col gap-2">
          <label htmlFor="password" className={normalMessage}>
            Password
          </label>
          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75"
          />
          {errorPassword ? (
            <p className="text-sm text-right text-red-500 font-semibold">
              {errorPassword.message}
            </p>
          ) : (
            <p className="text-sm text-right pr-2 text-zinc-700">
              Must be 6+ characters, and at least 1 uppercase letter
            </p>
          )}
        </span>

        {/* Confirm Password */}
        <span className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className={normalMessage}>
            Confirm Password
          </label>
          <input
            {...form.register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-8 py-4 rounded-md bg-gray-200/75"
          />
          {errorConfirmPassword && (<p className={errorMessage}>{errorConfirmPassword.message}</p>)}
        </span>
        <button
          type="submit"
          className="w-full px-8 py-4 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-hover duration-200"
        >
          Register
        </button>
        <p className="place-self-center">
          Already have an account?
          <Link
            href="/login"
            className="ml-2 font-semibold hover:text-underline hover:text-primary transition-hover duration-200"
          >
            Log-in
          </Link>
        </p>
      </form>
    </AuthContainer>
  );
}
