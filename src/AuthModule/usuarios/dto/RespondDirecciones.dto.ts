import { ApiProperty } from '@nestjs/swagger';

export class RespondDirecciones {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la dirección',
  })
  Id: string;

  @ApiProperty({ example: 'México', description: 'Nombre del país' })
  Pais: string;

  @ApiProperty({
    example: 'Baja California',
    description: 'Nombre del estado o provincia',
  })
  Estado: string;

  @ApiProperty({ example: 'Tijuana', description: 'Nombre de la ciudad' })
  Ciudad: string;

  @ApiProperty({
    example: 'Avenida Revolución',
    description: 'Nombre de la calle',
  })
  Calle: string;

  @ApiProperty({
    example: '123',
    description: 'Número exterior de la dirección',
  })
  NumExterior: string;

  @ApiProperty({
    example: '4B',
    description: 'Número interior (opcional)',
    required: false,
  })
  NumInterior: string;

  @ApiProperty({ example: '22000', description: 'Código postal' })
  CodigoPostal: string;
}
