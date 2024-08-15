import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersController } from './modules/users/users.controller';
import { OrdersController } from './modules/orders/orders.controller';
import { CategoriesController } from './modules/categories/categories.controller';
import { CartsController } from './modules/carts/carts.controller';
import { AuthService } from './modules/users/auth/auth.service';
import { PasswordService } from './modules/users/auth/password/password.service';
import { SkuService } from './modules/products/sku/sku.service';
import { CategoriesService } from './modules/categories/categories.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'usuario',
      password: 'senha',
      database: 'banco',
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
    OrdersController,
    UsersController,
    CategoriesController,
    CartsController,
  ],
  providers: [AuthService],
})
export class AppModule {}
