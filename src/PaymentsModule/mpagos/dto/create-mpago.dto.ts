import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinDate,
  MinLength,
  Validate,
} from 'class-validator';
import { CustomDateFormatValidator } from 'src/PaymentsModule/Validators/ValidatorsPayments';

export class CreateMpagoDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del propietario de la tarjeta',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  NombrePropietario: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del propietario de la tarjeta',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  ApellidoPropietario: string;

  @ApiProperty({
    example: '4111111111111111',
    description:
      'Número de la tarjeta de crédito o débito (Debe tener 16 dígitos)',
  })
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  NumeroTarjeta: string;

  @ApiProperty({
    example: '12/26',
    description:
      'Fecha de caducidad de la tarjeta en formato MM/YY (Ejemplo: 12/26)',
  })
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'La fecha debe estar en el formato MM/YY con un mes válido (1-12)',
  })
  @Validate(CustomDateFormatValidator, {
    message:
      'El año debe estar entre el año actual y hasta 10 años en el futuro',
  })
  FechaCad: string;

  @ApiProperty({
    example: '123',
    description:
      'Código de seguridad (CVV) de la tarjeta (Debe tener 3 dígitos)',
    writeOnly: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  CVV: string;
}
