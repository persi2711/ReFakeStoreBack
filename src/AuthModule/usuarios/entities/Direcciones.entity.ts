import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Derecciones' })
export class Direcciones {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la dirección',
  })
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty({ example: 'México', description: 'Nombre del país' })
  @Column('text')
  Pais: string;

  @ApiProperty({
    example: 'Baja California',
    description: 'Nombre del estado o provincia',
  })
  @Column('text')
  Estado: string;

  @ApiProperty({ example: 'Tijuana', description: 'Nombre de la ciudad' })
  @Column('text')
  Ciudad: string;

  @ApiProperty({
    example: 'Avenida Revolución',
    description: 'Nombre de la calle',
  })
  @Column('text')
  Calle: string;

  @ApiProperty({
    example: '123',
    description: 'Número exterior de la dirección',
  })
  @Column('text')
  NumExterior: string;

  @ApiProperty({
    example: '4B',
    description: 'Número interior (opcional)',
    required: false,
  })
  @Column('text', { nullable: true })
  NumInterior: string;

  @ApiProperty({ example: '22000', description: 'Código postal' })
  @Column('text')
  CodigoPostal: string;

  @ApiProperty({
    type: () => Usuario,
    description: 'Usuario propietario de la dirección',
  })
  @ManyToOne(() => Usuario, (usuario) => usuario.direcciones)
  @JoinColumn()
  Usuario: Usuario;

  @ApiProperty({
    type: () => [Ordenes],
    description: 'Órdenes enviadas a esta dirección',
  })
  @OneToMany(() => Ordenes, (orden) => orden.direccion)
  orden: Ordenes;
}
