export enum PlanType {
  FINAL_AMOUNT = "FINAL_AMOUNT",
  RENT = "RENT",
}

export interface CreatePlanDto {
  name: string;
  code: string;
  objective: number;
  type: PlanType;
  initialAmount: number;
  monthlyContribution: number;
  expectedReturnRate: number;
  duration: number;
  userId: string;
}

export interface SimulationResult {
  year: number;
  totalAmount: number;
  contributions: number;
  interest: number;
}

export interface RetirementPlan {
  id: number;
  name: string;
  code: string;
  objective: number;
  type: PlanType;
  initialAmount: number;
  monthlyContribution: number;
  expectedReturnRate: number;
  duration: number;
  userId: string;
  createdAt: string;
}
