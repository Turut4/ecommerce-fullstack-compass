import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { OrderController } from './order/order.controller';
import { UsersController } from './users/users.controller';
import { CategoriesController } from './categories/categories.controller';
import { CartsController } from './carts/carts.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'DB.sqlite',
      entities: ['./**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    CartsModule,
  ],
  controllers: [
    AppController,
    OrderController,
    UsersController,
    CategoriesController,
    CartsController,
  ],
  providers: [AppService],
})
export class AppModule {}
