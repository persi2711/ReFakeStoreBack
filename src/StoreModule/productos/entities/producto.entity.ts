import { ApiProperty } from '@nestjs/swagger';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import { CarritoProducto } from 'src/StoreModule/carritos/entities/CarritoProducto.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Productos' })
export class Productos {
  @ApiProperty({
    example: '5b40b1f7-7cbd-473f-8daf-052783a77d89',
    description: 'ID autogenerable  del producto',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'Laptop Lenevo 325',
    description: 'Titulo del producto',
  })
  @Column('text')
  title: string;
  @ApiProperty({
    example: 9.25,
    description: 'Precio del producto',
  })
  @Column('decimal')
  price: number;
  @ApiProperty({
    example: 'laptop',
    description: 'Categoria del producto',
  })
  @Column('text')
  category: string;
  @ApiProperty({
    example: 'Es una laptop etc...',
    description: 'Describe el producto',
  })
  @Column('text')
  description: string;
  @ApiProperty({
    example: 'https://storage.googleapis.com/',
    description: 'Enlace donde esta almecenada la imagen',
  })
  @Column('text')
  image: string;
  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.producto,
  )
  carritoProducto: CarritoProducto;
}
