import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { GetProductoDto } from './dto/get-producto.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProductsRespond } from './dto/productRespond-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @ApiOperation({
    summary: 'Metodo para obtener un listado de productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente',
    type: [ProductsRespond],
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de elementos',
  })
  @ApiQuery({
    name: 'pages',
    required: false,
    type: Number,
    description: 'Cantidad de saltos de pagina',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Busqueda por nombre',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'busqueda por categoria',
  })
  findAll(@Query() getProductoDto: GetProductoDto): Promise<ProductsRespond> {
    return this.productosService.findAll(getProductoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }
}
