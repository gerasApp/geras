import { Module } from "@nestjs/common";
import { PlanModule } from "./plan/plan.module";
import { AssetModule } from "./assets/asset.module";
import { ConfigModule } from "@nestjs/config";

// Aca se importan los modulos que se van a usar en la aplicacion
@Module({
  imports: [PlanModule, AssetModule, ConfigModule.forRoot()],
})
export class AppModule {}
