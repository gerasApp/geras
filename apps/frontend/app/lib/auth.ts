import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import type { Account, User as NextAuthUser } from "next-auth";

export const authoptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user?: NextAuthUser | null;
      account?: Account | null;
      profile?: Record<string, any>;
    }) {
      if (account && profile) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/social`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              accessToken: account.access_token,
              idToken: account.id_token,
              profile,
            }),
          },
        );
        if (!res.ok) {
          // extraemos mensaje de error para pasarlo como código
          const { message } = await res.json().catch(() => ({}));
          // redirige a /auth/error?error=Ya existe…
          throw new Error(encodeURIComponent(message || "OAuthError"));
        }
      }
      return true;
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      user?: NextAuthUser | null;
    }): Promise<JWT> {
      if (account && user) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/social`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                idToken: account.id_token,
                accessToken: account.access_token,
                profile: user,
              }),
            },
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const { accessToken: backendToken } = await res.json();
          token.accessToken = backendToken;
        } catch (err) {
          console.error("Error obteniendo JWT del backend:", err);
        }
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
};
