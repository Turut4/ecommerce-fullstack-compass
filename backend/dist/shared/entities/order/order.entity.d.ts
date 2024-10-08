import { User } from '../user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: string;
    total: number;
    orderItems: OrderItem[];
    address: string;
    name: string;
    user: User;
    additional_information: string;
    company: string;
}
