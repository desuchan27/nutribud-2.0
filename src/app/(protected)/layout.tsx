import { validateRequest } from "@/auth";
import { SessionProvider } from "@/lib/auth/SessionContext";
import { redirect } from "next/navigation";
// import { PageContainer } from "@/components/containers/PageContainer";
import Header from "@/components/partials/Header";
import { Footer } from "@/components/partials/Footer";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  if (!session.user) {
    redirect("/login");
  }


  // if (session.user && !session.user.userInfo) {
  //   redirect(`/onboarding/${session.user.id}`);
  // }
  
  return (
    <SessionProvider value={session}>
      <div className="flex flex-col">
        <Header />
        {/* <PageContainer> */}
          {children}
        {/* </PageContainer> */}
        <Footer />
      </div>
    </SessionProvider>
  );
}
