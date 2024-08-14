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

  @Get('/:id')
  findProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
