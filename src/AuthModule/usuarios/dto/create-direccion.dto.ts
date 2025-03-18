import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDireccionDto {
  @ApiProperty({ example: 'México', description: 'Nombre del país' })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Pais: string;

  @ApiProperty({
    example: 'Baja California',
    description: 'Nombre del estado o provincia',
  })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Estado: string;

  @ApiProperty({ example: 'Tijuana', description: 'Nombre de la ciudad' })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Ciudad: string;

  @ApiProperty({
    example: 'Avenida Revolución',
    description: 'Nombre de la calle',
  })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  Calle: string;

  @ApiProperty({
    example: '123',
    description: 'Número exterior de la dirección',
  })
  @IsString()
  @MaxLength(10)
  @MinLength(1)
  NumExterior: string;

  @ApiProperty({
    example: '4B',
    description: 'Número interior de la dirección',
  })
  @IsString()
  @MaxLength(10)
  NumInterior: string;

  @ApiProperty({ example: '22000', description: 'Código postal' })
  @IsString()
  @MaxLength(10)
  @MinLength(1)
  CodigoPostal: string;
}
