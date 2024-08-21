import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/shared/entities/order/order.entity';
import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { CartItem } from 'src/shared/entities/cart/cart-item.entity';
import { Cart } from 'src/shared/entities/cart/cart.entity';
import { Product } from 'src/shared/entities/product.entity';
import { Category } from 'src/shared/entities/category.entity';
import { User } from 'src/shared/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { CartsModule } from '../carts/carts.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartsModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
