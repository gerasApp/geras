import { RetirementPlan } from "./types";
import { withAuthHeaders } from "../../withAuthHeaders";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function updatePlan(
  id: number,
  planData: Partial<Omit<RetirementPlan, "id" | "createdAt">>,
) {
  try {
    const headers = await withAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/plan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
}
