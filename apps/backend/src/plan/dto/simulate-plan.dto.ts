import { ApiProperty } from '@nestjs/swagger';

export class SimulatePlanDto {
  @ApiProperty({
    description: 'Monto inicial de la inversión',
    example: 100000,
    minimum: 0
  })
  initialAmount!: number;

  @ApiProperty({
    description: 'Aporte mensual a la inversión',
    example: 10000,
    minimum: 0
  })
  monthlyContribution!: number;

  @ApiProperty({
    description: 'Tasa de rendimiento anual esperada (en porcentaje)',
    example: 10,
    minimum: 0,
    maximum: 100
  })
  expectedReturnRate!: number;

  @ApiProperty({
    description: 'Duración del plan en años',
    example: 30,
    minimum: 1,
    maximum: 100
  })
  duration!: number;
} 