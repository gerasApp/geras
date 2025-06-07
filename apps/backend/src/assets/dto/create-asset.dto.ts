import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AssetType, RiskLevel } from '../asset.model';

export class CreateAssetDto {
  @ApiProperty({
    description: 'Nombre del activo',
    example: 'S&P 500 ETF'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Tipo de activo',
    enum: AssetType,
    example: AssetType.ETF
  })
  @IsEnum(AssetType)
  @IsNotEmpty()
  type!: AssetType;

  @ApiProperty({
    description: 'Retorno histórico del activo (%)',
    example: 10.5
  })
  @IsNumber()
  @Min(0)
  historicalReturn!: number;

  @ApiProperty({
    description: 'Nivel de riesgo del activo',
    enum: RiskLevel,
    example: RiskLevel.MEDIUM
  })
  @IsEnum(RiskLevel)
  @IsNotEmpty()
  risk!: RiskLevel;

  @ApiProperty({
    description: 'Descripción opcional del activo',
    example: 'ETF que replica el índice S&P 500',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;
} 