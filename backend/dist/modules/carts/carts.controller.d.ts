import { CartsService } from './carts.service';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';
import { User } from 'src/shared/entities/user.entity';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getAllCarts(): Promise<import("../../shared/entities/cart/cart.entity").Cart[]>;
    getCartbyUser(userId: string): Promise<import("../../shared/entities/cart/cart.entity").Cart>;
    getMyCart(user: User): Promise<import("../../shared/entities/cart/cart.entity").Cart>;
    updateMyCart(user: User, product: AddToCartDto): Promise<import("../../shared/entities/cart/cart.entity").Cart>;
    deleteCart(id: string): Promise<void>;
    deleteUselessCarts(): Promise<void>;
}
