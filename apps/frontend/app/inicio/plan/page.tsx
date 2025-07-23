import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import RetirementForm from "@/app/components/planForm";

export default async function Home() {
  const session = await getServerSession(authoptions);
  const prisma = new PrismaClient();

  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  // Pasar el userId como prop al componente cliente
  return (
    <main className="min-h-screen">
      <RetirementForm userId={prismaUser!.id} />
    </main>
  );
}
