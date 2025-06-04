import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";

// Aca se define el modulo de Plan. Agrupa todos los controladores y servicios relacionados
// Luego se importa en el AppModule
@Module({
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
