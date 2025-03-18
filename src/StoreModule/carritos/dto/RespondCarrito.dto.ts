import { ApiProperty } from '@nestjs/swagger';

export class ProductoRespond {
  @ApiProperty({
    description: 'ID del producto',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({ description: 'Título del producto', example: 'Laptop Gamer' })
  title: string;

  @ApiProperty({ description: 'Precio del producto', example: '1499.99' })
  price: string;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónica',
  })
  category: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop potente con procesador Intel i7 y 16GB RAM',
  })
  description: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/laptop.jpg',
  })
  image: string;
}

export class CarritoProductoRespond {
  @ApiProperty({
    description: 'ID del producto en el carrito',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  Id: string;

  @ApiProperty({
    description: 'Cantidad del producto en el carrito',
    example: 2,
  })
  Cantidad: number;

  @ApiProperty({ description: 'Detalles del producto', type: ProductoRespond })
  producto: ProductoRespond;
}

export class RespondCarrito {
  @ApiProperty({
    description: 'ID del carrito',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  Id: string;

  @ApiProperty({ description: 'Total del carrito', example: '2999.98' })
  Total: string;

  @ApiProperty({
    description: 'Fecha de creación del carrito',
    example: '2025-03-18T10:00:00Z',
  })
  CreateDate: string;

  @ApiProperty({
    description: 'Estado del carrito (activo/inactivo)',
    example: true,
  })
  State: boolean;
  @ApiProperty({
    description: 'Lista de productos en el carrito',
    type: [CarritoProductoRespond],
  })
  carritoProducto: CarritoProductoRespond[];
}
