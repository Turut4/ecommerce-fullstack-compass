import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/products/product.entity';
import { SkuService } from './sku/sku.service';
import { CategoriesModule } from '../categories/categories.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, SkuService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoriesModule),
    JwtModule,
  ],
  exports: [ProductsService, SkuService],
})
export class ProductsModule {}
