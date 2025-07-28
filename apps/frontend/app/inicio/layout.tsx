import SideBar, { SideBarProps } from "@/app/components/sidebar";
import { Providers } from "@/app/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authoptions);
  console.log("Session in layout:", session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userProps: SideBarProps = {
    userImage: session.user.image!,
    userName: session.user.name!,
  };
  console.log("User props for sidebar:", userProps);
  return (
    <div className="flex flex-row md:overflow-hidden">
      <Providers session={session}>
        <SideBar {...userProps} />
        <div className="flex-grow auto p-12">{children}</div>
      </Providers>
    </div>
  );
}
