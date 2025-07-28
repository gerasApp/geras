import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function whoAmI() {
  const session = await getServerSession(authoptions);

  const token = session!.user.accessToken;
  // Llamo al backend para saber quién soy
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Como es un dato dinámico de usuario, mejor no cachearlo:
    cache: "no-store",
  });

  if (!res.ok) {
    // Manejo de error (por ej. token expirado)
    // return <p>Error al obtener perfil: {res.statusText}</p>;
    redirect("/api/auth/signin");
  }

  return res;
}
