import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersController } from './modules/users/users.controller';
import { OrdersController } from './modules/orders/orders.controller';
import { CategoriesController } from './modules/categories/categories.controller';
import { CartsController } from './modules/carts/carts.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/users/auth/auth.module';
import * as cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host:
          process.env.NODE_ENV === 'production'
            ? configService.get<string>('POSTGRES_HOST')
            : 'localhost',
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_NAME'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true,
      }),
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    CartsModule,
    AuthModule,
  ],
  controllers: [
    OrdersController,
    UsersController,
    CategoriesController,
    CartsController,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const corsOptions = {
      origin: 'http://127.0.0.1:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      Credential: true,
    };

    consumer.apply(cors(corsOptions), helmet()).forRoutes('*');
  }
}
