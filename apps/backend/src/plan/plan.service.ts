import { CreatePlanDto, SimulationResult } from "@geras/types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// Este servicio se encarga de resolver la logica de negocio relacionada con los planes
// Es uno solo pero pueden separarse en varios servicios si es necesario
@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}
  simulatePlan(data: CreatePlanDto): SimulationResult[] {
    const { duration, initialAmount, monthlyContribution, expectedReturnRate } =
      data;
    let total = initialAmount;
    let contribution = initialAmount;
    const monthlyReturn = Math.pow(1 + expectedReturnRate / 100, 1 / 12) - 1;

    const results: SimulationResult[] = [];

    results.push({
      year: 0,
      totalAmount: parseFloat(total.toFixed(2)),
      contributions: parseFloat(contribution.toFixed(2)),
      interest: 0,
    });

    for (let year = 1; year <= duration; year++) {
      //const annualContribution = monthlyContribution * 12;
      let annualContribution = 0;

      for (let month = 0; month < 12; month++) {
        total += monthlyContribution;
        total *= 1 + monthlyReturn; // AHORA ASUME QUE LA CONTRIBUCIÓN MENSUAL SE HACE AL PRINCIPIO DEL MES
        annualContribution += monthlyContribution;
      }

      contribution += annualContribution;
      const interest = total - contribution;

      results.push({
        year,
        totalAmount: parseFloat(total.toFixed(2)),
        contributions: parseFloat(contribution.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
      });
    }

    return results;
  }

  async createPlan(data: CreatePlanDto): Promise<any> {
    // Check if plan with the same code already exists
    const existingPlan = await this.prisma.plan.findUnique({
      where: { code: data.code },
    });

    if (existingPlan) {
      throw new Error(`Ya existe un plan con el código: ${data.code}`);
    }

    return this.prisma.plan.create({
      data: {
        name: data.name,
        code: data.code,
        objective: data.objective,
        type: data.type,
        initialAmount: data.initialAmount,
        duration: data.duration,
        monthlyContribution: data.monthlyContribution,
        expectedReturnRate: data.expectedReturnRate,
      },
    });
  }

  async deletePlan(id: number): Promise<boolean> {
    try {
      await this.prisma.plan.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async updatePlan(id: number, data: CreatePlanDto): Promise<any> {
    try {
      // Check if plan with the same code already exists (excluding current plan)
      const existingPlan = await this.prisma.plan.findFirst({
        where: {
          code: data.code,
          id: { not: id },
        },
      });

      if (existingPlan) {
        throw new Error(`Ya existe un plan con el código: ${data.code}`);
      }

      const updatedPlan = await this.prisma.plan.update({
        where: { id },
        data: {
          name: data.name,
          code: data.code,
          objective: data.objective,
          type: data.type,
          initialAmount: data.initialAmount,
          duration: data.duration,
          monthlyContribution: data.monthlyContribution,
          expectedReturnRate: data.expectedReturnRate,
        },
      });
      return updatedPlan;
    } catch (error: any) {
      return {
        error: error.message || "Error al actualizar el plan",
      };
    }
  }

  async getPlan(id: number): Promise<any> {
    try {
      const plan = await this.prisma.plan.findUnique({
        where: { id },
      });
      return plan;
    } catch (error: any) {
      return {
        error: error.message || "Error al obtener el plan",
      };
    }
  }
}
