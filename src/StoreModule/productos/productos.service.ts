import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { GetProductoDto } from './dto/get-producto.dto';
import { ProductsRespond } from './dto/productRespond-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private productosRepository: Repository<Productos>,
  ) {}
  async findAll(getProductoDto: GetProductoDto): Promise<ProductsRespond> {
    const { limit = 8, pages = 0, name, category } = getProductoDto;

    const query = this.productosRepository.createQueryBuilder('Productos');
    if (name) {
      query.andWhere('LOWER(Productos.title) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }
    if (category) {
      query.andWhere('LOWER(Productos.category) = LOWER(:category)', {
        category,
      });
    }
    const total = await query.getCount();

    const resultados = await query
      .skip(pages * limit)
      .take(limit)
      .getMany();
    const TotalPages = Math.floor((await total) / limit);
    const productsRespond = new ProductsRespond(total, TotalPages, resultados);
    return productsRespond;
  }

  async findOne(id: string) {
    return await this.productosRepository.findOne({ where: { id: id } });
  }
}
