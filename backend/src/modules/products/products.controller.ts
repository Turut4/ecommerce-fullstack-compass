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
  findAllProducts() {
    return this.productsService.findAll();
  }

  @Get()
  findProductsByName(@Query('name') name: string) {
    return this.productsService.findManyByName(name);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }

  @Patch(':id')
  updateProductStock(@Param('id') id: string, @Body() body: UpdateStockDto) {
    return this.productsService.updateStock(id, body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Get('/seed/:count')
  generateRandomProducts(@Param('count') count: string) {
    return this.productsService.generateRandomProducts(parseInt(count));
  }
}
