import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { RetirementPlanSchema } from "@geras/types";
import { z } from "zod/v4";
import type { RetirementPlan, SimulationResult } from "@geras/types";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { SimulatePlanDto } from "./dto/simulate-plan.dto";

// Este controlador se encarga de manejar las peticiones relacionadas con los planes
@ApiTags("Planes")
@Controller("plan")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: "Simula un plan de inversión" })
  @ApiBody({ type: SimulatePlanDto })
  @ApiResponse({ 
    status: 200, 
    description: "Simulación exitosa",
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          year: { type: 'number', example: 1 },
          totalAmount: { type: 'number', example: 110000 },
          contributions: { type: 'number', example: 100000 },
          interest: { type: 'number', example: 10000 }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
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
