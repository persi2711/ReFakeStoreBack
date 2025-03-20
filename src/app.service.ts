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
    try {
      const filePath = path.join(__dirname, '..', 'data', 'Products.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      const formattedData = data.map((product) => ({
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description || '',
        image: product.image,
      }));

      const result = await this.productoRepository.save(formattedData);
      return 'Datos cargados correctamente';
    } catch (error) {
      console.error('Error inserting products:', error);
      throw error;
    }
  }
}
