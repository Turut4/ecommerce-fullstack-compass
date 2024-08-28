import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/shared/entities/order/order.entity';
import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    JwtModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
