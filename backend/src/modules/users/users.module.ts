import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/shared/entities/user.entity';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/shared/interceptors/current-user.interceptor';
import { PasswordService } from './auth/password/password.service';
import { Cart } from 'src/shared/entities/cart/cart.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { CartsModule } from '../carts/carts.module';
import { Product } from 'src/shared/entities/product.entity';
import { CartItem } from 'src/shared/entities/cart/cart-item.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    UsersService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  imports: [
    TypeOrmModule.forFeature([User, Cart, Product, CartItem]),
    ProductsModule,
    CategoriesModule,
    CartsModule,
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
