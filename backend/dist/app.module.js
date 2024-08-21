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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'usuario',
                password: 'senha',
                database: 'banco',
                entities: ['./**/*.entity.js'],
                migrations: ['src/migrations/**/*.ts'],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            categories_module_1.CategoriesModule,
            carts_module_1.CartsModule,
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