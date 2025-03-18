import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'Token de acceso JWT' })
  token: string;
  constructor(token: string) {
    this.token = token;
  }
}
