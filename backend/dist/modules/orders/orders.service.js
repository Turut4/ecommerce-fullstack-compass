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
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    constructor(orderRepo, orderItemRepo, usersService, productsService) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.usersService = usersService;
        this.productsService = productsService;
    }
    async createOrderItem(createOrderItem) {
        const orderItems = createOrderItem.map(async (item) => {
            const product = await this.productsService.findOne(item.productId);
            if (product.stock > item.quantity) {
                product.stock -= item.quantity;
                await this.productsService.updateStock(product.id, {
                    stock: product.stock,
                });
            }
            else {
                throw new common_1.BadRequestException(product.stock > 0
                    ? `We have only ${product.stock} of ${product.name}`
                    : `Product ${product.name} is out of stock`);
            }
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            return this.orderItemRepo.create({ product, quantity: item.quantity });
        });
        return Promise.all(orderItems);
    }
    async create(userId, createOrderDto) {
        const { createOrderItems, address } = createOrderDto;
        const user = await this.usersService.findOne(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const orderItems = await this.createOrderItem(createOrderItems);
        const total = orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const order = this.orderRepo.create({ user, orderItems, address, total });
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
        users_service_1.UsersService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map