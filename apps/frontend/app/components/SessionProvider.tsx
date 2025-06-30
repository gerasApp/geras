"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  console.log("Session in Providers:", session);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
