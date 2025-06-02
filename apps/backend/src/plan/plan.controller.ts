import { Controller, Post, Body } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { RetirementPlanSchema } from "@geras/types";
import type { RetirementPlan, SimulationResult } from "@geras/types";


// Este controlador se encarga de manejar las peticiones relacionadas con los planes
@Controller("plan")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post("simulate")
  async simulatePlan(
    @Body() planData: RetirementPlan,
  ): Promise<SimulationResult[]> {
    const parsedData = RetirementPlanSchema.parse(planData);
    return this.planService.simulatePlan(parsedData);
  }
}
