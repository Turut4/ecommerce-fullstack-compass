import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Cart } from 'shared/entities/cart.entity';

@Module({
  imports: [Cart],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
