import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CartDto } from 'src/shared/dtos/cart/cart.dto';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';

@Controller('carts')
//@Serialize(CartDto)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getAllCarts() {
    return this.cartsService.findAll();
  }

  @Get('/:userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartsService.findByUser(userId);
  }

  @Patch('/:userId/')
  async updateCart(
    @Param('userId') userId: string,
    @Body() product: AddToCartDto,
  ) {
    return this.cartsService.addProduct(userId, product);
  }

  @Delete('trash/:id')
  async deleteCart(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }

  @Delete('/trash')
  async deleteUselessCarts() {
    return this.cartsService.removeUselessCarts();
  }
}
