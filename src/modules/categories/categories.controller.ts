import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/shared/dtos/category/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Post()
  // createCategory(@Body() body: CreateCategoryDto) {
  //   return this.categoriesService.create(body);
  // }
}
