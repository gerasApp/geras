import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { RetirementPlanSchema } from "@geras/types";
import { z } from "zod/v4";
import type { RetirementPlan, SimulationResult } from "@geras/types";

// Este controlador se encarga de manejar las peticiones relacionadas con los planes
@Controller("plan")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post("simulate")
  simulatePlan(@Body() planData: RetirementPlan): SimulationResult[] {
    const parsedData = RetirementPlanSchema.safeParse(planData);
    if (!parsedData.success) {
      throw new BadRequestException({
        message: "Error en los datos del plan",
        errors: z.flattenError(parsedData.error),
      });
    }
    return this.planService.simulatePlan(parsedData.data);
  }
}
