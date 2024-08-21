"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categories_controller_1 = require("./categories.controller");
const category_entity_1 = require("../../shared/entities/category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../shared/entities/product.entity");
const products_module_1 = require("../products/products.module");
const jwt_1 = require("@nestjs/jwt");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, product_entity_1.Product]),
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
            jwt_1.JwtModule,
        ],
        providers: [categories_service_1.CategoriesService],
        controllers: [categories_controller_1.CategoriesController],
        exports: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map