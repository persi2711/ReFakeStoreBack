import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RespondCarrito } from './dto/RespondCarrito.dto';
@ApiTags('Carritos')
@ApiBearerAuth()
@Controller('carritos')
export class CarritosController {
  constructor(private readonly carritosService: CarritosService) {}

  @ApiOperation({ summary: 'Obtener un carrito por su ID' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del carrito',
  })
  @ApiResponse({
    status: 200,
    description: 'Carrito obtenido correctamente',
    type: RespondCarrito,
  })
  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carritosService.findOne(id);
  }

  @ApiOperation({
    summary: 'Obtener el carrito activo del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Carrito activo obtenido correctamente',
    type: RespondCarrito,
  })
  @Get()
  @UseGuards(AuthGuard())
  ActiveCar(@GetUser() user: Usuario) {
    return this.carritosService.ActiveCar(user);
  }

  @ApiOperation({ summary: 'Agregar un producto al carrito activo' })
  @ApiParam({
    name: 'id',
    example: '660e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del producto a agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto agregado al carrito correctamente',
  })
  @Patch('agregar/:id')
  @UseGuards(AuthGuard())
  Agregar(@GetUser() user: Usuario, @Param('id', ParseUUIDPipe) id: string) {
    return this.carritosService.agregar(id, user);
  }

  @ApiOperation({ summary: 'Reducir la cantidad de un producto en el carrito' })
  @ApiParam({
    name: 'id',
    example: '660e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del producto a reducir',
  })
  @ApiResponse({
    status: 200,
    description: 'Cantidad reducida correctamente en el carrito',
  })
  @Patch('reducir/:id')
  @UseGuards(AuthGuard())
  reducir(@GetUser() user: Usuario, @Param('id', ParseUUIDPipe) id: string) {
    return this.carritosService.reducir(id, user);
  }
}
