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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("../../shared/entities/cart/cart.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const cart_item_entity_1 = require("../../shared/entities/cart/cart-item.entity");
let CartsService = class CartsService {
    constructor(cartRepo, cartItemRepo, productsService) {
        this.cartRepo = cartRepo;
        this.cartItemRepo = cartItemRepo;
        this.productsService = productsService;
    }
    async create() {
        const newCart = this.cartRepo.create();
        return await this.cartRepo.save(newCart);
    }
    async findOne(id) {
        return await this.cartRepo.findOne({
            where: { id },
            relations: ['user', 'cartItems'],
        });
    }
    async findByUser(userId) {
        const userCart = await this.cartRepo.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'cartItems'],
        });
        if (!userCart)
            throw new common_1.BadRequestException('Cart not found');
        return userCart;
    }
    async findAll() {
        return await this.cartRepo.find({ relations: ['user', 'cartItems'] });
    }
    async addProduct(userId, addToCartDto) {
        const cartToUpdate = await this.findByUser(userId);
        const productExists = cartToUpdate.cartItems.find((item) => item.product.id === addToCartDto.productId);
        if (productExists)
            return this.increaseProductQuantity(userId, addToCartDto.productId);
        if (!cartToUpdate)
            return this.create();
        const product = await this.productsService.findOne(addToCartDto.productId);
        if (!product)
            throw new Error('Product not found');
        const item = this.cartItemRepo.create({
            cart: cartToUpdate,
            product,
            quantity: 1,
        });
        cartToUpdate.cartItems.push(item);
        console.log(cartToUpdate.cartItems);
        return await this.cartRepo.save(cartToUpdate);
    }
    async increaseProductQuantity(userId, productId) {
        const cartToUpdate = await this.findByUser(userId);
        if (!cartToUpdate) {
            throw new Error('Cart not found');
        }
        const item = cartToUpdate.cartItems.find((item) => item.product.id === productId);
        if (!item) {
            throw new Error('Product not found in cart');
        }
        item.quantity++;
        return await this.cartRepo.save(cartToUpdate);
    }
    async decreaseProductQuantity(userId, productId) {
        const cartToUpdate = await this.findByUser(userId);
        if (!cartToUpdate) {
            throw new Error('Cart not found');
        }
        const item = cartToUpdate.cartItems.find((item) => item.product.id === productId);
        if (!item) {
            throw new Error('Product not found in cart');
        }
        if (item.quantity === 1) {
            return this.removeProduct(userId, productId);
        }
        item.quantity--;
        return await this.cartRepo.save(cartToUpdate);
    }
    async removeProduct(userId, productId) {
        const cartToUpdate = await this.findByUser(userId);
        if (!cartToUpdate) {
            throw new Error('Cart not found');
        }
        const itemIndex = cartToUpdate.cartItems.findIndex((item) => item.product.id === productId);
        if (itemIndex === -1) {
            throw new Error('Product not found in cart');
        }
        cartToUpdate.cartItems.splice(itemIndex, 1);
        return await this.cartRepo.save(cartToUpdate);
    }
    async remove(id) {
        const cart = await this.findOne(id);
        cart.user = null;
        await this.cartRepo.delete(id);
    }
    async removeUselessCarts() {
        const carts = await this.findAll();
        carts.forEach(async (cart) => {
            if (cart.user === null) {
                await this.cartRepo.delete(cart.id);
            }
        });
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService])
], CartsService);
//# sourceMappingURL=carts.service.js.map