import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import PlanRetiroPageWrapper from "./PlanRetiroPageWrapper";

export default async function Home() {
  const session = await getServerSession(authoptions);
  const prisma = new PrismaClient();
  const userEmail = session?.user?.email;
  let userId = "";
  if (userEmail) {
    const prismaUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    userId = prismaUser?.id || "";
  }
  return <PlanRetiroPageWrapper userId={userId} />;
}
