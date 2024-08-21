import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { Product } from 'src/shared/entities/product.entity';
import { In, Repository } from 'typeorm';
import { SkuService } from './sku/sku.service';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';
import { CategoriesService } from '../categories/categories.service';
import { User } from 'src/shared/entities/user.entity';

const { faker } = require('@faker-js/faker');

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly skuService: SkuService,
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    admin: User,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = this.repo.create(createProductDto);
    product.sku = this.skuService.generateSku(product);
    product.createdBy = admin;

    const productExists = await this.repo.findOne({
      where: { sku: product.sku },
    });

    if (productExists) {
      throw new BadRequestException('This product already exists...');
    }

    product.category = await this.categoriesService.findOne(
      createProductDto.categoryId,
    );

    return await this.repo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repo.find();
  }

  async findManyByName(name: string): Promise<Product[]> {
    return await this.repo
      .createQueryBuilder()
      .where('name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.repo.findOneBy({ id });
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

  async generateProduct() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      const category = await this.categoriesService.getRandomCategory();
      const product = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        color: faker.color.rgb(),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: faker.image.url(),
        size: faker.helpers.arrayElement(['small', 'medium', 'large']),
        percentageDiscount: faker.number.int({ min: 0, max: 40 }),
        category,
      } as Product;

      product.sku = this.skuService.generateSku(product);

      return product;
    }
  }

  async generateRandomProducts(count: number) {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      const products = await Promise.all(
        Array.from({ length: count }, async () => await this.generateProduct()),
      );

      return await this.repo.save(products);
    }
  }
}
