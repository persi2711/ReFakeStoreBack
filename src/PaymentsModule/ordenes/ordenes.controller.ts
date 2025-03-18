import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RespondOneOrden, RespondOrden } from './dto/RespondOrden.dto';
import { Ordenes } from './entities/ordene.entity';
@ApiTags('Ordenes')
@ApiBearerAuth()
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiBody({
    type: CreateOrdeneDto,
    description: 'Datos necesarios para la orden',
  })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createOrdeneDto: CreateOrdeneDto, @GetUser() user: Usuario) {
    return this.ordenesService.create(createOrdeneDto, user);
  }

  @ApiOperation({ summary: 'Obtener todas las órdenes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de órdenes obtenida correctamente',
    type: [RespondOrden],
  })
  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.ordenesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una orden específica' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden obtenida correctamente',
    type: RespondOneOrden,
  })
  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(id);
  }
}
