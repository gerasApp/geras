import { RetirementPlan, SimulationResult } from "@geras/types";

export async function simulatePlan(
  plan: RetirementPlan,
): Promise<SimulationResult[]> {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  if (!api_url) {
    throw new Error("NEXT_PUBLIC_API_URL no está definida");
  }
  const response = await fetch(`${api_url}/plan/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });

  if (!response.ok) {
    throw new Error("Error al simular el plan");
  }

  return await response.json();
}
