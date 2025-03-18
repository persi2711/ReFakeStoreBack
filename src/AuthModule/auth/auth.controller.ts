import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDdto } from '../usuarios/dto/Login-usuario.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { Console } from 'console';
import { GetUser } from './Decorators/get-user.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateMpagoDto } from 'src/PaymentsModule/mpagos/dto/create-mpago.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './ResponseDto/LoginResponse.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Iniciar sesión en la plataforma' })
  @ApiBody({
    description: 'Datos para el inicio de sesión',
    type: LoginUsuarioDdto,
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: LoginResponseDto,
  })
  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDdto): Promise<LoginResponseDto> {
    return this.authService.login(loginUsuarioDto);
  }

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({
    description: 'Datos del usuario a registrar',
    type: CreateUsuarioDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente',
  })
  @Post('register')
  register(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<{ message: string }> {
    return this.authService.register(createUsuarioDto);
  }
}
