import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOrdeneDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la dirección asociada a la orden',
  })
  @IsUUID()
  IdDireccion: string;

  @ApiProperty({
    example: '660e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del método de pago utilizado',
  })
  @IsUUID()
  IdMpago: string;
}
