"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const create_product_dto_1 = require("../../shared/dtos/product/create-product.dto");
const products_service_1 = require("./products.service");
const update_product_dto_1 = require("../../shared/dtos/product/update-product.dto");
const update_stock_dto_1 = require("../../shared/dtos/product/update-stock.dto");
const current_user_decorator_1 = require("../../shared/decorators/current-user.decorator");
const user_entity_1 = require("../../shared/entities/user.entity");
const admin_guard_1 = require("../../shared/guards/admin.guard");
const auth_guard_1 = require("../../shared/guards/auth.guard");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    createProduct(admin, body) {
        return this.productsService.create(admin, body);
    }
    findAllProducts(page, pageSize, category, priceMin, priceMax, sort, search) {
        return this.productsService.findAll({
            category,
            priceMin,
            priceMax,
            sort,
            search,
        }, page, pageSize);
    }
    findProductsByName(name) {
        return this.productsService.findManyByName(name);
    }
    findProductVariant(id, color, size) {
        return this.productsService.findOneVariant(id, color, size);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    updateProduct(id, body) {
        return this.productsService.update(id, body);
    }
    updateProductStock(id, body) {
        return this.productsService.updateStock(id, body);
    }
    deleteProduct(id) {
        return this.productsService.delete(id);
    }
    generateRandomProducts(count) {
        return this.productsService.generateRandomProducts(parseInt(count));
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('priceMin')),
    __param(4, (0, common_1.Query)('priceMax')),
    __param(5, (0, common_1.Query)('sort')),
    __param(6, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllProducts", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findProductsByName", null);
__decorate([
    (0, common_1.Get)('variant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('color')),
    __param(2, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findProductVariant", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_dto_1.UpdateStockDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProductStock", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('/seed/:count'),
    __param(0, (0, common_1.Param)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "generateRandomProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map