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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_item_entity_1 = require("../../shared/entities/order/order-item.entity");
const order_entity_1 = require("../../shared/entities/order/order.entity");
const typeorm_2 = require("typeorm");
const carts_service_1 = require("../carts/carts.service");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    constructor(orderRepo, orderItemRepo, cartService, usersService) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.cartService = cartService;
        this.usersService = usersService;
    }
    async create(userId, createOrderDto) {
        const cart = await this.cartService.findByUser(userId);
        const order = this.orderRepo.create({
            user: await this.usersService.findOne(userId),
            orderItems: cart.cartItems.map((cartItem) => {
                const orderItem = this.orderItemRepo.create({
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                });
                return orderItem;
            }),
            total: cart.total,
            address: createOrderDto.address,
        });
        return this.orderRepo.save(order);
    }
    async findAll() {
        return this.orderRepo.find({ relations: ['user', 'orderItems'] });
    }
    async findByUser(userId) {
        return this.orderRepo.find({
            where: { user: { id: userId } },
            relations: ['user', 'orderItems'],
        });
    }
    async findOne(id) {
        return this.orderRepo.findOne({
            where: { id },
            relations: ['user', 'orderItems'],
        });
    }
    async delete(id) {
        return this.orderRepo.delete(id);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        carts_service_1.CartsService,
        users_service_1.UsersService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map