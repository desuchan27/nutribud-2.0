import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await validateRequest();

  if (session.user) {
    redirect("/home")
  } else if (!session.user) {
    redirect("/login")
  }
}