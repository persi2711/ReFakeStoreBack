import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Direcciones } from './Direcciones.entity';
import { MPagos } from 'src/PaymentsModule/mpagos/entities/mpago.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Usuarios' })
export class Usuario {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del usuario',
  })
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @Column('text')
  Nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @Column('text')
  Apellido: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico único del usuario',
  })
  @Column('text', { unique: true })
  Correo: string;

  @ApiProperty({
    example: '********',
    description: 'Contraseña del usuario (No se retorna en respuestas)',
    writeOnly: true,
  })
  @Column('text', { select: false })
  Password: string;

  @ApiProperty({
    example: true,
    description: 'Estado del usuario (Activo o inactivo)',
  })
  @Column('bool')
  State: boolean;

  @ApiProperty({
    type: () => [Direcciones],
    description: 'Lista de direcciones del usuario',
  })
  @OneToMany(() => Direcciones, (direcciones) => direcciones.Usuario)
  direcciones: Direcciones;

  @ApiProperty({
    type: () => [MPagos],
    description: 'Métodos de pago del usuario',
  })
  @OneToMany(() => MPagos, (mPagos) => mPagos.Usuario)
  mPagos: MPagos;

  @ApiProperty({
    type: () => [Ordenes],
    description: 'Órdenes realizadas por el usuario',
  })
  @OneToMany(() => Ordenes, (ordenes) => ordenes.usuario)
  ordenes: Ordenes;

  @ApiProperty({
    type: () => [Carrito],
    description: 'Carritos asociados al usuario',
  })
  @OneToMany(() => Carrito, (carritos) => carritos.usuario)
  carritos: Carrito;
}
