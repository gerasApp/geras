import { Module } from "@nestjs/common";
import { PlanModule } from "./plan/plan.module";


// Aca se importan los modulos que se van a usar en la aplicacion
@Module({
  imports: [PlanModule],
})
export class AppModule {}
