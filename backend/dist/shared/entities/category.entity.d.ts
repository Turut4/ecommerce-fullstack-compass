import { Product } from './products/product.entity';
import { User } from './user.entity';
export declare class Category {
    id: string;
    name: string;
    products: Product[];
    createdBy: User;
}
