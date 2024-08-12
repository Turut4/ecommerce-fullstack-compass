import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [Category],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
