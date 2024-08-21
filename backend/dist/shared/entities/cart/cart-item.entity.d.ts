import { Product } from '../product.entity';
import { Cart } from './cart.entity';
export declare class CartItem {
    id: string;
    product: Product;
    quantity: number;
    cart: Cart;
}
