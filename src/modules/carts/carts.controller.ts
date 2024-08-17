import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete(':id')
  async deleteCart(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
