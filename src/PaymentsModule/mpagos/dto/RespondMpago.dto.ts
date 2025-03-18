import { ApiProperty } from '@nestjs/swagger';

export class RespondMpagos {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del método de pago',
  })
  Id: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del propietario de la tarjeta',
  })
  NombrePropietario: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del propietario de la tarjeta',
  })
  ApellidoPropietario: string;

  @ApiProperty({
    example: '4111111111111111',
    description: 'Número de la tarjeta de crédito o débito',
  })
  NumeroTarjeta: string;

  @ApiProperty({
    example: '12/26',
    description: 'Fecha de caducidad de la tarjeta',
  })
  FechaCad: string;
}
