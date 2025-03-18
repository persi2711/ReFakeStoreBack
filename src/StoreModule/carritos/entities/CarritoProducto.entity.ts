import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carrito } from './carrito.entity';
import { Productos } from 'src/StoreModule/productos/entities/producto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'CarritoProducto' })
export class CarritoProducto {
  @ApiProperty({
    example: '660e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del producto en el carrito',
  })
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad del producto en el carrito',
  })
  @Column('int')
  Cantidad: number;

  @ApiProperty({
    type: () => Carrito,
    description: 'Carrito al que pertenece el producto',
  })
  @ManyToOne(() => Carrito, (carrito) => carrito.carritoProducto)
  @JoinColumn()
  carrito: Carrito;

  @ApiProperty({
    type: () => Productos,
    description: 'Producto agregado al carrito',
  })
  @ManyToOne(() => Productos, (producto) => producto.carritoProducto)
  @JoinColumn()
  producto: Productos;
}
