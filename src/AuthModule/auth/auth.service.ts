import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDdto } from '../usuarios/dto/Login-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './Interfaces/jwt-payload.interface';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import { CreateCarritoDto } from 'src/StoreModule/carritos/dto/create-carrito.dto';
import { LoginResponseDto } from './ResponseDto/LoginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Carrito)
    private carritoRespository: Repository<Carrito>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginUsuarioDto: LoginUsuarioDdto): Promise<LoginResponseDto> {
    const usuario = await this.userRepository.findOne({
      where: { Correo: loginUsuarioDto.Correo },
      select: {
        Correo: true,
        Password: true,
        Apellido: true,
        Nombre: true,
        Id: true,
      },
    });
    if (!usuario) {
      throw new NotFoundException('correo o contraseñas son incorrectos');
    }

    if (!bcrypt.compareSync(loginUsuarioDto.Password, usuario.Password)) {
      throw new NotFoundException('correo o contraseñas son incorrectos');
    }

    return new LoginResponseDto(
      this.getJwtToken({
        Id: usuario.Id,
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Correo: usuario.Correo,
      }),
    );
  }
  async register(
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<{ message: string }> {
    const usuario = await this.userRepository.create(createUsuarioDto);
    const correo = await this.userRepository.findOne({
      where: { Correo: createUsuarioDto.Correo },
    });
    if (correo) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }
    usuario.Password = bcrypt.hashSync(usuario.Password, 10);
    usuario.State = true;
    const now = Date().toString();
    await this.userRepository.save(usuario);
    const carrito = await this.carritoRespository.create({
      CreateDate: now,
      Total: 0,
      State: true,
      usuario: usuario,
    });
    this.carritoRespository.save(carrito);
    return { message: 'Usuario registrado exitosamente' };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
