"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_entity_1 = require("../../shared/entities/user.entity");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth/auth.service");
const core_1 = require("@nestjs/core");
const current_user_interceptor_1 = require("../../shared/interceptors/current-user.interceptor");
const password_service_1 = require("./auth/password/password.service");
const cart_entity_1 = require("../../shared/entities/cart/cart.entity");
const products_module_1 = require("../products/products.module");
const categories_module_1 = require("../categories/categories.module");
const carts_module_1 = require("../carts/carts.module");
const product_entity_1 = require("../../shared/entities/product.entity");
const cart_item_entity_1 = require("../../shared/entities/cart/cart-item.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [
            users_service_1.UsersService,
            auth_service_1.AuthService,
            password_service_1.PasswordService,
            { provide: core_1.APP_INTERCEPTOR, useClass: current_user_interceptor_1.CurrentUserInterceptor },
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, cart_entity_1.Cart, product_entity_1.Product, cart_item_entity_1.CartItem]),
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            carts_module_1.CartsModule,
        ],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService, password_service_1.PasswordService, auth_service_1.AuthService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map