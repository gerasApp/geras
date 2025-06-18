import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
} from "@nestjs/common";
import { PlanService } from "./plan.service";
import type { SimulationResult } from "@geras/types";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { CreatePlanDto } from "@geras/types";

// Este controlador se encarga de manejar las peticiones relacionadas con los planes
@ApiTags("Planes")
@Controller("plan")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: "Simula un plan de inversión" })
  @ApiBody({ type: CreatePlanDto })
  @ApiResponse({
    status: 200,
    description: "Simulación exitosa",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          year: { type: "number", example: 1 },
          totalAmount: { type: "number", example: 110000 },
          contributions: { type: "number", example: 100000 },
          interest: { type: "number", example: 10000 },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @Post("simulate")
  simulatePlan(@Body() planData: CreatePlanDto): SimulationResult[] {
    return this.planService.simulatePlan(planData);
  }

  @ApiOperation({ summary: "Crea un nuevo plan de inversión" })
  @ApiResponse({ status: 201, description: "Plan creado exitosamente" })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @Post("create")
  async createPlan(@Body() planData: CreatePlanDto) {
    try {
      const newPlan = await this.planService.createPlan(planData);
      return newPlan;
    } catch (error: any) {
      return {
        error: error.message || "Error al crear el plan",
      };
    }
  }

  @ApiOperation({ summary: "Eliminar un plan de inversión" })
  @ApiResponse({ status: 200, description: "Plan eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Plan no encontrado" })
  @Delete(":id")
  async deletePlan(@Param("id") id: string) {
    try {
      const deleted = await this.planService.deletePlan(Number(id));
      if (!deleted) {
        return { error: "Plan no encontrado" };
      }
      return { message: "Plan eliminado exitosamente" };
    } catch (error: any) {
      return {
        error: error.message || "Error al eliminar el plan",
      };
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "Actualizar un activo" })
  @ApiResponse({ status: 200, description: "Activo actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Activo no encontrado" })
  @ApiResponse({ status: 400, description: "Datos de entrada inválidos" })
  async updatePlan(
    @Param("id") id: string,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    try {
      const updated = await this.planService.updatePlan(
        Number(id),
        createPlanDto,
      );
      if (!updated) {
        return { error: "Plan no encontrado" };
      }
      return updated;
    } catch (error: any) {
      return {
        error: error.message || "Error al actualizar el plan",
      };
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener plan por id" })
  @ApiResponse({ status: 200, description: "Plan encontrado" })
  @ApiResponse({ status: 404, description: "Plan no encontrado" })
  async getPlan(@Param("id") id: string) {
    try {
      const plan = await this.planService.getPlan(Number(id));
      if (!plan) {
        return { error: "Plan no encontrado" };
      }
      return plan;
    } catch (error: any) {
      return {
        error: error.message || "Error al obtener el plan",
      };
    }
  }
}
