import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';
import { SkuService } from './sku/sku.service';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';

const { faker } = require('@faker-js/faker');

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly skuService: SkuService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const sku = this.skuService.generateSku(createProductDto);
    const existingProduct = await this.repo.findOne({ where: { sku } });

    if (existingProduct) {
      throw new BadRequestException('This product already exists...');
    }

    const product = this.repo.create({ ...createProductDto, sku });

    return await this.repo.save(product);
  }

  async find(): Promise<Product[]> {
    return await this.repo.find();
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.repo
      .createQueryBuilder()
      .where('name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findOne(sku: string): Promise<Product> {
    const product = await this.repo.findOneBy({ sku });
    if (!product) throw new NotFoundException('Product not Found...');

    return product;
  }

  async update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(sku);

    Object.assign(product, updateProductDto);
    product.sku = this.skuService.generateSku(product);

    return await this.repo.save(product);
  }

  async updateStock(sku: string, newStock: UpdateStockDto) {
    const product = await this.findOne(sku);

    if (!product) {
      throw new Error(`Product with sku ${sku} not found`);
    }

    product.stock += newStock.stock;

    return this.repo.save(product);
  }

  async delete(sku: string) {
    const product = await this.findOne(sku);
    if (!product) throw new NotFoundException('product not found');

    return this.repo.remove(product);
  }

  generateProduct() {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      color: faker.color.rgb(),
      stock: faker.number.int({ min: 0, max: 100 }),
      image: faker.image.url(),
      size: faker.helpers.arrayElement(['small', 'medium', 'large']),
      percentageDiscount: faker.number.int({ min: 0, max: 40 }),
    } as Product;

    product.sku = this.skuService.generateSku(product);

    return product;
  }

  async generateRandomProducts(count: number) {
    const products = Array.from({ length: count }, () =>
      this.generateProduct(),
    );

    return await this.repo.save(products);
  }
}
