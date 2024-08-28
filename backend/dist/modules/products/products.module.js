"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../shared/entities/products/product.entity");
const sku_service_1 = require("./sku/sku.service");
const categories_module_1 = require("../categories/categories.module");
const jwt_1 = require("@nestjs/jwt");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, sku_service_1.SkuService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            jwt_1.JwtModule,
        ],
        exports: [products_service_1.ProductsService, sku_service_1.SkuService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map