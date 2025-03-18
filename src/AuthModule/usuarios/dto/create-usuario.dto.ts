import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  Nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  Apellido: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  @MaxLength(50)
  Correo: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Contraseña del usuario',
  })
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  Password: string;
}
