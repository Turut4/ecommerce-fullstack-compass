"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./modules/users/users.module");
const products_module_1 = require("./modules/products/products.module");
const categories_module_1 = require("./modules/categories/categories.module");
const carts_module_1 = require("./modules/carts/carts.module");
const orders_module_1 = require("./modules/orders/orders.module");
const users_controller_1 = require("./modules/users/users.controller");
const orders_controller_1 = require("./modules/orders/orders.controller");
const categories_controller_1 = require("./modules/categories/categories.controller");
const carts_controller_1 = require("./modules/carts/carts.controller");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/users/auth/auth.module");
const cors = require("cors");
const helmet_1 = require("helmet");
let AppModule = class AppModule {
    configure(consumer) {
        const corsOptions = {
            origin: 'http://localhost:5173',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Content-Type, Authorization',
            Credential: true,
        };
        consumer.apply(cors(corsOptions), (0, helmet_1.default)()).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: process.env.NODE_ENV === 'production'
                        ? configService.get('POSTGRES_HOST')
                        : 'localhost',
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_NAME'),
                    entities: [__dirname + '/../**/*.entity.js'],
                    synchronize: true,
                }),
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            categories_module_1.CategoriesModule,
            carts_module_1.CartsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [
            orders_controller_1.OrdersController,
            users_controller_1.UsersController,
            categories_controller_1.CategoriesController,
            carts_controller_1.CartsController,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map