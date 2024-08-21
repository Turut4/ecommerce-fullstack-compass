import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/shared/dtos/category/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from 'src/shared/entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(body);
  }

  @Get()
  getCategories() {
    return this.categoriesService.findAll();
  }

  @Get('/:name')
  async findOneCategory(@Param('name') name: string): Promise<Category> {
    return await this.categoriesService.findOne(name);
  }

  @Patch('/:id')
  updateCategory(@Param('id') id: string, @Body() attrs: Partial<Category>) {
    return this.categoriesService.update(id, attrs);
  }

  @Delete('/:id')
  removeCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }

  @Get('seed/:amount')
  seedCategories(@Param('amount') amount: number) {
    return this.categoriesService.genrateRandomCategories(amount);
  }
}
