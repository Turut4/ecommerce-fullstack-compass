import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from 'src/shared/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/shared/entities/product.entity';
import { SkuService } from '../products/sku/sku.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoriesService, ProductsService, SkuService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
