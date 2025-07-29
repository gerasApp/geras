import { withAuthHeaders } from "../../withAuthHeaders";
import { CreatePlanDto } from "./types";

export async function createPlan(plan: CreatePlanDto): Promise<{
  id: number;
  name: string;
  code: string;
  objective: number;
  type: string;
  initialAmount: number;
  duration: number;
  monthlyContribution: number;
  createdAt: string;
  expectedReturnRate: number;
  userId: string;
}> {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  if (!api_url) {
    throw new Error("NEXT_PUBLIC_API_URL no está definida");
  }
  const headers = await withAuthHeaders();
  const response = await fetch(`${api_url}/plan/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(plan),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Error al crear el plan");
  }

  return await response.json();
}
