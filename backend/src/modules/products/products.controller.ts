import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/shared/entities/user.entity';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  createProduct(@CurrentUser() admin: User, @Body() body: CreateProductDto) {
    return this.productsService.create(admin, body);
  }

  @Get()
  findAllProducts(
    @Query('category') category?: string,
    @Query('price_min') priceMin?: number,
    @Query('price_max') priceMax?: number,
    @Query('sort') sort?: 'lower' | 'higher' | 'a-z' | 'z-a',
  ) {
    return this.productsService.findAll({ category, priceMin, priceMax, sort });
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
