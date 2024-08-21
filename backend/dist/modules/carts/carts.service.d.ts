import { Cart } from 'src/shared/entities/cart/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';
import { CartItem } from 'src/shared/entities/cart/cart-item.entity';
export declare class CartsService {
    private readonly cartRepo;
    private readonly cartItemRepo;
    private readonly productsService;
    constructor(cartRepo: Repository<Cart>, cartItemRepo: Repository<CartItem>, productsService: ProductsService);
    create(): Promise<Cart>;
    findOne(id: string): Promise<Cart>;
    findByUser(userId: string): Promise<Cart>;
    findAll(): Promise<Cart[]>;
    addProduct(userId: string, addToCartDto: AddToCartDto): Promise<Cart>;
    increaseProductQuantity(userId: string, productId: string): Promise<Cart>;
    decreaseProductQuantity(userId: string, productId: string): Promise<Cart>;
    removeProduct(userId: string, productId: string): Promise<Cart>;
    remove(id: string): Promise<void>;
    removeUselessCarts(): Promise<void>;
}
