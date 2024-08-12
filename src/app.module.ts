import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Cart } from './entities/cart.entity';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/order.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'DB.sqlite',
      entities: [User, Cart],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    OrderModule,
    CategoriesModule,
    CartsModule,
  ],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
