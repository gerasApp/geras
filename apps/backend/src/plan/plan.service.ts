import { CreatePlanDto, SimulationResult } from "@geras/types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// Este servicio se encarga de resolver la logica de negocio relacionada con los planes
// Es uno solo pero pueden separarse en varios servicios si es necesario
@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) { }
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
        total *= (1 + monthlyReturn); // AHORA ASUME QUE LA CONTRIBUCIÓN MENSUAL SE HACE AL PRINCIPIO DEL MES
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
    const simulation = this.simulatePlan(data);
    const objective = simulation[simulation.length - 1]?.totalAmount || 0;
    return this.prisma.plan.create({
      data: {
        ...data,
        objective,
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
      const updatedPlan = await this.prisma.plan.update({
        where: { id },
        data,
      });
      return updatedPlan;
    } catch (error: any) {
      return {
        error: error.message || "Error al actualizar el plan",
      };
    }
  }
}
