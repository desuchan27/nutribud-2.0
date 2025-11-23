import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function onboardingRedirect() {
  const session = await validateRequest();

  if (!session.user) {
    redirect("/login");
  } else {
    redirect(`/onboarding/${session.user?.id}`);
  }
}
