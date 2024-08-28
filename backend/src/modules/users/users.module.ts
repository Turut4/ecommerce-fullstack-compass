import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/shared/entities/user.entity';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/shared/interceptors/current-user.interceptor';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { Product } from 'src/shared/entities/products/product.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    UsersService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    ProductsModule,
    CategoriesModule,
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
