import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/product.entity';
import { SkuService } from './sku/sku.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, SkuService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
