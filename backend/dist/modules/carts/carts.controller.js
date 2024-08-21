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
exports.CartsController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const serialize_interceptor_1 = require("../../shared/interceptors/serialize.interceptor");
const cart_dto_1 = require("../../shared/dtos/cart/cart.dto");
const add_to_cart_dto_1 = require("../../shared/dtos/cart/add-to-cart.dto");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const current_user_decorator_1 = require("../../shared/decorators/current-user.decorator");
const user_entity_1 = require("../../shared/entities/user.entity");
let CartsController = class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async getAllCarts() {
        return this.cartsService.findAll();
    }
    async getCartbyUser(userId) {
        return this.cartsService.findByUser(userId);
    }
    async getMyCart(user) {
        return this.cartsService.findByUser(user.id);
    }
    async updateMyCart(user, product) {
        return this.cartsService.addProduct(user.id, product);
    }
    async deleteCart(id) {
        return this.cartsService.remove(id);
    }
    async deleteUselessCarts() {
        return this.cartsService.removeUselessCarts();
    }
};
exports.CartsController = CartsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "getAllCarts", null);
__decorate([
    (0, common_1.Get)('/getcart/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "getCartbyUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/mycart'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "getMyCart", null);
__decorate([
    (0, common_1.Patch)('/:userId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "updateMyCart", null);
__decorate([
    (0, common_1.Delete)('trash/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "deleteCart", null);
__decorate([
    (0, common_1.Delete)('/trash'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "deleteUselessCarts", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.Controller)('carts'),
    (0, serialize_interceptor_1.Serialize)(cart_dto_1.CartDto),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartsController);
//# sourceMappingURL=carts.controller.js.map