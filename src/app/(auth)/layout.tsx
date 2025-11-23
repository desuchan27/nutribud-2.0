import Image from "next/image";

import { Footer } from "@/components/partials/Footer";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await validateRequest();
  if (session.user) {
    redirect("/home")
  }
  return (
    <div className="flex flex-col h-dvh">
      <div className="flex flex-row h-full">
        {children}
        <div className="relative hidden md:flex w-1/2 h-full bg-gray-50">
          <Image
            src="/img/auth-bg.jpg"
            alt="Avocado and Egg Toast"
            fill
            className="object-cover rounded-tl-[5rem]"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
