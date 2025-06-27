import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  Min,
  IsString,
  IsEnum,
} from "class-validator";
import { PlanType } from "./plan";

export class CreatePlanDto {
  @ApiProperty({
    description: "Nombre del plan",
    example: "Plan de Retiro 2030",
    minimum: 1,
    maximum: 100,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Código único del plan",
    example: "RET2030",
    minimum: 1,
    maximum: 20,
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({
    description: "Objetivo financiero del plan",
    example: 1000000,
    minimum: 0,
    maximum: 10000000,
  })
  @IsNumber()
  @Min(0)
  @Max(10000000)
  objective!: number;

  @ApiProperty({
    description: "Tipo de plan",
    enum: PlanType,
    example: PlanType.FINAL_AMOUNT,
  })
  @IsEnum(PlanType)
  type!: PlanType;

  @ApiProperty({
    description: "Monto inicial de la inversión",
    example: 100000,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  initialAmount!: number;

  @ApiProperty({
    description: "Aporte mensual a la inversión",
    example: 10000,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  monthlyContribution!: number;

  @ApiProperty({
    description: "Tasa de rendimiento anual esperada (en porcentaje)",
    example: 10,
    minimum: 0,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  expectedReturnRate!: number;

  @ApiProperty({
    description: "Duración del plan en años",
    example: 30,
    minimum: 1,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  duration!: number;
}
