import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import { Productos } from 'src/StoreModule/productos/entities/producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarritoProducto } from './CarritoProducto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Carrito' })
export class Carrito {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del carrito',
  })
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty({
    example: 120.5,
    description: 'Total del carrito en la moneda local',
  })
  @Column('decimal')
  Total: number;

  @ApiProperty({
    example: '2025-03-08T12:00:00Z',
    description: 'Fecha de creación del carrito',
  })
  @Column('text')
  CreateDate: string;

  @ApiProperty({
    example: true,
    description: 'Estado del carrito (activo o inactivo)',
  })
  @Column('bool')
  State: boolean;

  @ApiProperty({
    type: () => Usuario,
    description: 'Usuario propietario del carrito',
  })
  @ManyToOne(() => Usuario, (usuario) => usuario.carritos)
  @JoinColumn()
  usuario: Usuario;

  @ApiProperty({
    type: () => Ordenes,
    description: 'Orden generada a partir de este carrito',
  })
  @OneToOne(() => Ordenes, (orden) => orden.carrito)
  orden: Ordenes;

  @ApiProperty({
    type: () => [CarritoProducto],
    description: 'Productos en el carrito',
  })
  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.carrito,
  )
  carritoProducto: CarritoProducto;
}
