import { Cart } from './cart/cart.entity';
import { Order } from './order/order.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    username: string;
    created_at: Date;
    updated_at: Date;
    cart: Cart;
    orders: Order[];
    is_admin: boolean;
}
