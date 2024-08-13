import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from 'shared/entities/category.entity';

@Module({
  imports: [Category],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
