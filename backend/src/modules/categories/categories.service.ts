import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/shared/dtos/category/create-category.dto';
import { Category } from 'src/shared/entities/category.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';

const { faker } = require('@faker-js/faker');

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  async resolveProducts(productsId: string[]) {
    const products = Promise.all(
      productsId.map(async (p) => await this.productsService.findOne(p)),
    );

    return products;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.repo.create(createCategoryDto);
    if (createCategoryDto.productsId?.length > 0)
      category.products = await this.resolveProducts(
        createCategoryDto.productsId,
      );

    return this.repo.save(category);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const category = await this.repo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) throw new BadRequestException('Category not found');

    return category;
  }

  async update(id: string, attrs: Partial<Category>) {
    const category = await this.findOne(id);
    if (!category) throw new Error('Category not found');
    Object.assign(category, attrs);

    return this.repo.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    return this.repo.remove(category);
  }

  async getRandomCategory() {
    const categories = await this.findAll();
    return categories[Math.floor(Math.random() * categories.length)];
  }

  genreteRandomCategory() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      const category = {
        name: faker.commerce.department(),
      } as Category;
      return category;
    }
  }

  async genrateRandomCategories(amount: number) {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      const categories = await Promise.all(
        Array.from({ length: amount }, this.genreteRandomCategory),
      );
      return await this.repo.save(categories);
    }
  }
}
