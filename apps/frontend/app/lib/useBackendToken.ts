import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";

export async function useBackendToken() {
  const session = await getServerSession(authoptions);

  if (!session?.user.accessToken) {
    throw new Error("Usuario no autenticado");
  }
  return session.user.accessToken;
}
