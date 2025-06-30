import SideBar from "@/app/components/sidebar";
import { Providers } from "@/app/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authoptions);
  console.log("Session in layout:", session);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-row md:overflow-hidden">
      <Providers session={session}>
        <SideBar />
        <div className="flex-grow auto p-12">{children}</div>
      </Providers>
    </div>
  );
}
