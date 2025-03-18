import { ApiProperty } from '@nestjs/swagger';
import { RespondDirecciones } from 'src/AuthModule/usuarios/dto/RespondDirecciones.dto';
import { RespondMpagos } from 'src/PaymentsModule/mpagos/dto/RespondMpago.dto';
import { RespondCarrito } from 'src/StoreModule/carritos/dto/RespondCarrito.dto';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';

class RespondCarritoOrden {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del carrito',
  })
  Id: string;

  @ApiProperty({
    example: 120.5,
    description: 'Total del carrito en la moneda local',
  })
  Total: number;

  @ApiProperty({
    example: '2025-03-08T12:00:00Z',
    description: 'Fecha de creación del carrito',
  })
  CreateDate: string;

  @ApiProperty({
    example: true,
    description: 'Estado del carrito (activo o inactivo)',
  })
  State: boolean;
}
export class RespondOrden {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la orden',
  })
  Id: string;
  @ApiProperty({
    example: '2025-03-08T12:00:00Z',
    description: 'Fecha de creación de la orden',
  })
  CreateDate: string;
  @ApiProperty({
    description: 'Carrito asociado a la orden',
  })
  carrito: RespondCarritoOrden;
}
export class RespondOneOrden {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la orden',
  })
  Id: string;
  @ApiProperty({
    example: '2025-03-08T12:00:00Z',
    description: 'Fecha de creación de la orden',
  })
  CreateDate: string;
  @ApiProperty({
    description: 'Direccion asociado a la orden',
  })
  direccion: RespondDirecciones;
  @ApiProperty({
    description: 'Metodo de pago asociado a la orden',
  })
  mPago: RespondMpagos;
  @ApiProperty({
    description: 'Metodo de pago asociado a la orden',
  })
  carrito: RespondCarrito;
}
