import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CartDto } from 'src/shared/dtos/cart/cart.dto';

@Controller('carts')
@Serialize(CartDto)
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

  @Patch('/:userId/:productId')
  async updateCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartsService.addProduct(userId, productId);
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
