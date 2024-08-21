import { CartsService } from './carts.service';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getAllCarts(): Promise<import("../../shared/entities/cart/cart.entity").Cart[]>;
    getCart(userId: string): Promise<import("../../shared/entities/cart/cart.entity").Cart>;
    updateCart(userId: string, product: AddToCartDto): Promise<import("../../shared/entities/cart/cart.entity").Cart>;
    deleteCart(id: string): Promise<void>;
    deleteUselessCarts(): Promise<void>;
}
