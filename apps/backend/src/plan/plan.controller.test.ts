import { Test } from "@nestjs/testing";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { PrismaModule } from "../prisma/prisma.module";
import { CreatePlanDto, SimulationResult, PlanType } from "@geras/types";

describe("PlanController", () => {
  let planController: PlanController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [PlanService],
      imports: [PrismaModule],
    }).compile();

    planController = moduleRef.get(PlanController);
  });

  describe("simulate", () => {
    const duration = 30;
    it("should return an array of yearly returns", () => {
      const mockInput: CreatePlanDto = {
        name: "Test Plan",
        code: "TEST001",
        objective: 1000000,
        type: PlanType.FINAL_AMOUNT,
        initialAmount: 100,
        monthlyContribution: 100,
        expectedReturnRate: 5,
        duration: duration,
        userId: "test-user-id",
      };

      const result: SimulationResult[] = planController.simulatePlan(mockInput);

      expect(result).toHaveLength(duration + 1);
      expect(result[0]).toHaveProperty("year");
      expect(result[0]).toHaveProperty("totalAmount");
      expect(result[0]).toHaveProperty("interest");
      expect(result[0]).toHaveProperty("contributions");
    });
  });
});
