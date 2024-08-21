import { Product } from '../product.entity';
export declare class OrderItem {
    id: string;
    product: Product;
    quantity: number;
    order: OrderItem;
}
