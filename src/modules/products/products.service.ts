import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  async create(
    name: string,
    description: string,
    price: number,
    percentageDiscount: number,
  ) {
    const discount = percentageDiscount || null;
    const product = this.repo.create({
      name,
      description,
      price,
      percentageDiscount: discount,
    });

    return await this.repo.save(product);
  }

  async find(name: string) {
    return this.repo.find({ where: { name } });
  }

  async findOne(id: string) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not Found...');

    return product;
  }
}
