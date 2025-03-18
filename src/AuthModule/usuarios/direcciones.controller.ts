import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { updateDireccionDto } from './dto/update-direccion.dto';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from './entities/usuario.entity';
import { GetUser } from '../auth/Decorators/get-user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Direcciones } from './entities/Direcciones.entity';
import { RespondDirecciones } from './dto/RespondDirecciones.dto';
@ApiTags('Direcciones')
@ApiBearerAuth()
@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @ApiOperation({
    summary: 'Crear una nueva dirección para el usuario autenticado',
  })
  @ApiBody({
    type: CreateDireccionDto,
    description: 'Datos de la dirección a crear',
  })
  @ApiResponse({ status: 201, description: 'Dirección creada exitosamente' })
  @Post('')
  @UseGuards(AuthGuard())
  create(
    @Body() createDireccion: CreateDireccionDto,
    @GetUser() user: Usuario,
  ) {
    return this.usuariosService.CreateDirec(createDireccion, user);
  }

  @ApiOperation({
    summary: 'Obtener todas las direcciones del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de direcciones obtenida correctamente',
    type: [RespondDirecciones],
  })
  @Get()
  @UseGuards(AuthGuard())
  Get(@GetUser() user: Usuario): Promise<Direcciones[]> {
    return this.usuariosService.GetDirec(user);
  }

  @ApiOperation({ summary: 'Actualizar una dirección existente' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la dirección',
  })
  @ApiBody({
    type: updateDireccionDto,
    description: 'Datos para actualizar la dirección',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección actualizada correctamente',
  })
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDireccionDto: updateDireccionDto,
  ) {
    return this.usuariosService.updateDirec(id, updateDireccionDto);
  }

  @ApiOperation({ summary: 'Eliminar una dirección por su ID' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID de la dirección a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección eliminada correctamente',
  })
  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.deleteDirec(id);
  }
}
