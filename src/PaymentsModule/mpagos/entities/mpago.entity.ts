import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'MPagos' })
export class MPagos {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del método de pago',
  })
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del propietario de la tarjeta',
  })
  @Column('text')
  NombrePropietario: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del propietario de la tarjeta',
  })
  @Column('text')
  ApellidoPropietario: string;

  @ApiProperty({
    example: '4111111111111111',
    description: 'Número de la tarjeta de crédito o débito',
  })
  @Column('text')
  NumeroTarjeta: string;

  @ApiProperty({
    example: '12/26',
    description: 'Fecha de caducidad de la tarjeta',
  })
  @Column('text')
  FechaCad: string;

  @ApiProperty({
    example: '***',
    description: 'CVV de la tarjeta (No se retorna en respuestas)',
    writeOnly: true,
  })
  @Column('text', { select: false })
  CVV: string;

  @ApiProperty({
    type: () => Usuario,
    description: 'Usuario propietario del método de pago',
  })
  @ManyToOne(() => Usuario, (usuario) => usuario.mPagos)
  @JoinColumn()
  Usuario: Usuario;

  @ApiProperty({
    type: () => [Ordenes],
    description: 'Órdenes pagadas con este método de pago',
  })
  @OneToMany(() => Ordenes, (orden) => orden.mPago)
  orden: Ordenes;
}
