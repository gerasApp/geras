import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

export const authoptions = {
  adapter: PrismaAdapter(new PrismaClient()),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  /* 
    Descomentar para cambiar el formlario predeterminado de next-auth
    pages: { 
    signIn: "/auth/signin",
  },*/
};

export const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
