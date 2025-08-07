import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { AssetType, RiskLevel } from "./asset";

export class CreateAssetDto {
  @ApiProperty({
    description: "Nombre del activo",
    example: "S&P 500 ETF",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Tipo de activo",
    enum: AssetType,
    example: AssetType.ETF,
  })
  @IsEnum(AssetType)
  @IsNotEmpty()
  type!: AssetType;

  @ApiProperty({
    description: "Retorno histórico del activo (%)",
    example: 10.5,
  })
  @IsNumber()
  @Min(0)
  historicalReturn!: number;

  @ApiProperty({
    description: "Cantidad de unidades del activo",
    example: 100,
  })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({
    description: "Precio de compra del activo",
    example: 150.75,
  })
  @IsNumber()
  @Min(0)
  purchasePrice!: number;

  @ApiProperty({
    description: "Nivel de riesgo del activo",
    enum: RiskLevel,
    example: RiskLevel.MEDIUM,
  })
  @IsEnum(RiskLevel)
  @IsNotEmpty()
  risk!: RiskLevel;

  @ApiProperty({
    description: "Descripción opcional del activo",
    example: "ETF que replica el índice S&P 500",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "ID del plan al que pertenece el activo",
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  planId?: number;

  @ApiProperty({
    description: "ID del usuario al que pertenece el activo",
    example: 1,
    required: false,
  })
  @IsString()
  @IsOptional()
  userId?: string;
}
