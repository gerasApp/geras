import { z } from "zod/v4";

// Schema de Zod sirve para validar datos en tiempo de ejecución
// Se pueden agregar más validaciones y restricciones
// las comparten el front y el back sin tener que duplicar código.
export const RetirementPlanSchema = z.object({
  duration: z.int(),
  initialAmount: z.number(),
  expectedReturnRate: z.number(),
  monthlyContribution: z.number(),
});

// Tipo TypeScript inferido automáticamente desde el schema.
export type RetirementPlan = z.infer<typeof RetirementPlanSchema>;

export type SimulationResult = {
  year: number;
  totalAmount: number;
  contributions: number;
  interest: number;
};
