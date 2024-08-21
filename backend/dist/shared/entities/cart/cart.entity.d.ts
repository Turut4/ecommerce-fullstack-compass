import { User } from '../user.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: string;
    user: User;
    cartItems: CartItem[];
    total: number;
    calculateTotal(): Promise<void>;
}
