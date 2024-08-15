import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Get()
  findAllProducts(@Query('name') name: string) {
    return this.productsService.find(name);
  }

  @Get('/:sku')
  findProduct(@Param('sku') sku: string) {
    return this.productsService.findOne(sku);
  }

  @Patch('/:sku')
  updateProduct(@Param('sku') sku: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(sku, body);
  }

  @Patch(':sku')
  updateProductStock(@Param('sku') sku: string, @Body() body: UpdateStockDto) {
    return this.productsService.updateStock(sku, body);
  }

  @Delete('/:sku')
  deleteProduct(@Param('sku') sku: string) {
    return this.productsService.delete(sku);
  }
}
