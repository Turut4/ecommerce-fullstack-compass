import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/product.entity';
import { SkuService } from './sku/sku.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from 'src/shared/entities/category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, SkuService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoriesModule),
    JwtModule
  ],
  exports: [ProductsService, SkuService],
})
export class ProductsModule {}
