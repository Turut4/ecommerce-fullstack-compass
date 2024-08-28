import { Product } from '../products/product.entity';
export declare class OrderItem {
    id: string;
    product: Product;
    quantity: number;
    order: OrderItem;
}
