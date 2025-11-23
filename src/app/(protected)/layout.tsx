import db from "@/lib/db";
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

  const user = await db.userInfo.findFirst({
    where: {
      userId: session.user?.id,
    },
  });

  const userbirthday = user?.birthDate;
  const userheight = user?.height;
  const userweight = user?.weight;

  if (!session.user) {
    redirect("/login");
  }


  // if (session.user && !session.user.userInfo) {
  //   redirect(`/onboarding/${session.user.id}`);
  // }

  console.log("user", userbirthday, userheight, userweight);
  
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
