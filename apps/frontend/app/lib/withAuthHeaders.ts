import { getSession } from "next-auth/react";

export async function withAuthHeaders(): Promise<HeadersInit> {
  const session = await getSession();
  const token = session?.user.accessToken;
  if (!token) throw new Error("Usuario no autenticado");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
