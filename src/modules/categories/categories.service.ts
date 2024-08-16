import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/shared/dtos/category/create-category.dto';
import { Category } from 'src/shared/entities/category.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
    private readonly productsService: ProductsService,
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
    });
    if (!category) throw new Error('Category not found');
    console.log(category.products);

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
    if (!category) throw new Error('Category not found');

    return this.repo.remove(category);
  }
}
