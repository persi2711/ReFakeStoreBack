import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUsuarioDdto {
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
