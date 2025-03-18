import { ApiProperty } from '@nestjs/swagger';
import { Direcciones } from 'src/AuthModule/usuarios/entities/Direcciones.entity';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { MPagos } from 'src/PaymentsModule/mpagos/entities/mpago.entity';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Ordenes' })
export class Ordenes {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la orden',
  })
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty({
    example: '2025-03-08T12:00:00Z',
    description: 'Fecha de creación de la orden',
  })
  @Column('text')
  CreateDate: string;

  @ApiProperty({
    type: () => Usuario,
    description: 'Usuario que realizó la orden',
  })
  @ManyToOne(() => Usuario, (usuario) => usuario.ordenes)
  @JoinColumn()
  usuario: Usuario;

  @ApiProperty({
    type: () => Carrito,
    description: 'Carrito asociado a la orden',
  })
  @OneToOne(() => Carrito, (carrito) => carrito.orden)
  @JoinColumn()
  carrito: Carrito;

  @ApiProperty({
    type: () => Direcciones,
    description: 'Dirección de envío asociada a la orden',
  })
  @ManyToOne(() => Direcciones, (direccion) => direccion.orden)
  @JoinColumn()
  direccion: Direcciones;

  @ApiProperty({
    type: () => MPagos,
    description: 'Método de pago utilizado en la orden',
  })
  @ManyToOne(() => MPagos, (mPago) => mPago.orden)
  mPago: MPagos;
}
