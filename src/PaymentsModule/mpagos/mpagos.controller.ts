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
import { MpagosService } from './mpagos.service';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
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
import { RespondMpagos } from './dto/RespondMpago.dto';
@ApiTags('Mpagos')
@ApiBearerAuth()
@Controller('mpagos')
export class MpagosController {
  constructor(private readonly mpagosService: MpagosService) {}

  @ApiOperation({
    summary: 'Registrar un nuevo método de pago para el usuario autenticado',
  })
  @ApiBody({
    type: CreateMpagoDto,
    description: 'Datos del método de pago a registrar',
  })
  @ApiResponse({
    status: 201,
    description: 'Método de pago registrado correctamente',
  })
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createMpagoDto: CreateMpagoDto, @GetUser() user: Usuario) {
    return this.mpagosService.create(createMpagoDto, user);
  }

  @ApiOperation({
    summary: 'Obtener todos los métodos de pago del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de métodos de pago obtenida correctamente',
    type: [RespondMpagos],
  })
  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: Usuario) {
    return this.mpagosService.findAll(user);
  }

  @ApiOperation({ summary: 'Actualizar un método de pago existente' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del método de pago',
  })
  @ApiBody({
    type: UpdateMpagoDto,
    description: 'Datos actualizados del método de pago',
  })
  @ApiResponse({
    status: 200,
    description: 'Método de pago actualizado correctamente',
  })
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateMpagoDto: UpdateMpagoDto) {
    return this.mpagosService.update(id, updateMpagoDto);
  }

  @ApiOperation({ summary: 'Eliminar un método de pago por su ID' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del método de pago a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Método de pago eliminado correctamente',
  })
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.mpagosService.remove(id);
  }
}
