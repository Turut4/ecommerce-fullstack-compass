import { Order } from './order/order.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    username: string;
    created_at: Date;
    updated_at: Date;
    orders: Order[];
    is_admin: boolean;
}
