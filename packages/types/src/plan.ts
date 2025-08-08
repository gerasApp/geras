import { z } from "zod/v4";

// Enum for plan types
export enum PlanType {
  FINAL_AMOUNT = "FINAL_AMOUNT",
  RENT = "RENT",
}

// Schema de Zod sirve para validar datos en tiempo de ejecución
// Se pueden agregar más validaciones y restricciones
// las comparten el front y el back sin tener que duplicar código.
export const RetirementPlanSchema = z.strictObject({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(20),
  objective: z.number().min(0).max(Number.MAX_SAFE_INTEGER),
  type: z.nativeEnum(PlanType),
  duration: z.int().min(0).max(100),
  initialAmount: z.number().min(0).max(Number.MAX_SAFE_INTEGER),
  expectedReturnRate: z.number().min(0).max(100),
  monthlyContribution: z.number().min(0).max(Number.MAX_SAFE_INTEGER),
});

// Tipo TypeScript inferido automáticamente desde el schema.
export type RetirementPlan = z.infer<typeof RetirementPlanSchema>;

export type SimulationResult = {
  year: number;
  totalAmount: number;
  contributions: number;
  interest: number;
};
