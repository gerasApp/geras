import RetirementForm from "@/app/components/planForm";
import { UserSchema, type User } from "@geras/types/user";
import whoAmI from "@/app/lib/whoAmI";

export default async function Home() {
  const res = await whoAmI();

  const json = await res.json();

  const result = UserSchema.safeParse(json);
  if (!result.success) {
    console.error("Perfil inválido:", result.error);
    return <p>Perfil de usuario mal formado.</p>;
  }
  const user: User = result.data;

  // Pasar el userId como prop al componente cliente
  return (
    <main className="min-h-screen">
      <RetirementForm userId={user!.id} />
    </main>
  );
}
