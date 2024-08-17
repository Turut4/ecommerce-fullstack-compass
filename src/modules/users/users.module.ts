import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/shared/entities/user.entity';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/shared/interceptors/current-user.interceptor';
import { PasswordService } from './auth/password/password.service';
import { CartsService } from '../carts/carts.service';
import { Cart } from 'src/shared/entities/cart.entity';

@Module({
  providers: [
    UsersService,
    AuthService,
    PasswordService,
    CartsService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  imports: [TypeOrmModule.forFeature([User, Cart])],
  controllers: [UsersController],
  exports: [UsersService, PasswordService],
})
export class UsersModule {}
