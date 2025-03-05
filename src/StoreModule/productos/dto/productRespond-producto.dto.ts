import { ApiProperty } from '@nestjs/swagger';
import { Productos } from '../entities/producto.entity';

export class ProductsRespond {
  @ApiProperty({
    example: '169',
    description: 'total de productos en base de datos',
  })
  Total: number;
  @ApiProperty({
    example: '21',
    description: 'Total de paginas con respecto a limite(default 8) ',
  })
  TotalPages: number;
  @ApiProperty({
    description: 'Lista de productos ',
    type: [Productos],
  })
  Resultados: Productos[];
  constructor(total: number, totalPages: number, resultados: Productos[]) {
    this.Total = total;
    this.TotalPages = totalPages;
    this.Resultados = resultados;
  }
}
