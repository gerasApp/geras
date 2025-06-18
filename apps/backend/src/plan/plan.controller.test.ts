import { Test } from "@nestjs/testing";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { PrismaModule } from "../prisma/prisma.module";
import { CreatePlanDto, SimulationResult } from "@geras/types";

describe("PlanController", () => {
  let planController: PlanController;
  let planService: PlanService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [PlanService],
      imports: [PrismaModule],
    }).compile();

    planService = moduleRef.get(PlanService);
    planController = moduleRef.get(PlanController);
  });

  describe("simulate", () => {
    let duration = 30;
    it("should return an array of yearly returns", () => {
      const mockInput: CreatePlanDto = {
        initialAmount: 100,
        monthlyContribution: 100,
        expectedReturnRate: 5,
        duration: duration,
      };

      const result: SimulationResult[] = planController.simulatePlan(mockInput);

      expect(result).toHaveLength(duration + 1);
      expect(result[0]).toHaveProperty("year");
      expect(result[0]).toHaveProperty("totalAmount");
      expect(result[0]).toHaveProperty("contributions");
      expect(result[0]).toHaveProperty("interest");
    });
  });
});
