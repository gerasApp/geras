import { RetirementPlan, SimulationResult } from "@geras/types";
import { Injectable } from "@nestjs/common";

// Este servicio se encarga de resolver la logica de negocio relacionada con los planes
// Es uno solo pero pueden separarse en varios servicios si es necesario
@Injectable()
export class PlanService {
  simulatePlan(data: RetirementPlan): SimulationResult[] {
    const { duration, initialAmount, monthlyContribution, expectedReturnRate } =
      data;
    let total = initialAmount;
    let contribution = initialAmount;
    const annualReturn = expectedReturnRate / 100;

    const results: SimulationResult[] = [];

    results.push({
      year: 0,
      totalAmount: parseFloat(total.toFixed(2)),
      contributions: parseFloat(contribution.toFixed(2)),
      interest: 0,
    });

    for (let year = 1; year <= duration; year++) {
      const annualContribution = monthlyContribution * 12;

      total = (total + annualContribution) * (1 + annualReturn);
      contribution += annualContribution;
      const interest = total - contribution;

      results.push({
        year,
        totalAmount: total,
        contributions: contribution,
        interest: interest,
      });
    }

    return results;
  }
}
