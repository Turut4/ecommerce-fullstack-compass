import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CartDto } from 'src/shared/dtos/cart/cart.dto';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/shared/entities/user.entity';
// import { AdminGuard } from 'src/shared/guards/admin.guard';

@Controller('carts')
@Serialize(CartDto)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getAllCarts() {
    return this.cartsService.findAll();
  }

  @Get('/getcart/:userId')
  async getCartbyUser(@Param('userId') userId: string) {
    return this.cartsService.findByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/mycart')
  async getMyCart(@CurrentUser() user: User) {
    return this.cartsService.findByUser(user.id);
  }

  @Patch('/:userId')
  @UseGuards(AuthGuard)
  async updateMyCart(@CurrentUser() user: User, @Body() product: AddToCartDto) {
    return this.cartsService.addProduct(user.id, product);
  }

  @Delete('trash/:id')
  // @UseGuards(AdminGuard)
  async deleteCart(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }

  @Delete('/trash')
  // @UseGuards(AdminGuard)
  async deleteUselessCarts() {
    return this.cartsService.removeUselessCarts();
  }
}
