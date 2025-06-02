import {RetirementPlan, RetirementPlanSchema, SimulationResult } from "@geras/types";

export async function simulatePlan(plan: RetirementPlan): Promise<SimulationResult[]> {
  const response = await fetch("http://localhost:3001/plan/simulate", {
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