import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/shared/entities/user.entity';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/shared/interceptors/current-user.interceptor';

@Module({
  providers: [
    UsersService,
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
