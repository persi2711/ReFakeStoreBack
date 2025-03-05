import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './StoreModule/productos/entities/producto.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Productos)
    private readonly productoRepository: Repository<Productos>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async loadData(password: string): Promise<string> {
    const product = await this.productoRepository.find();
    if (product.length > 0) {
      return 'los datos ya fueron cargados';
    }
    const storedPassword = this.configService.get<string>('DB_LOAD_PASSWORD');

    if (password !== storedPassword) {
      throw new Error('Contraseña incorrecta');
    }
    const filePath = path.join(__dirname, '../data/Products.json');
    if (!fs.existsSync(filePath)) {
      throw new Error('El archivo JSON no existe');
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await this.productoRepository.save(jsonData);

    return 'Datos cargados correctamente';
  }
}
