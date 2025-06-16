import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { PrismaModule } from "../prisma/prisma.module";
// Aca se define el modulo de Plan. Agrupa todos los controladores y servicios relacionados
// Luego se importa en el AppModule
@Module({
  imports: [PrismaModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
