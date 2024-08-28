import { Category } from '../category.entity';
import { User } from '../user.entity';
export declare enum Size {
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L",
    EXTRALARGE = "XL"
}
export declare class Product {
    id: string;
    sku: string;
    name: string;
    price: number;
    percentageDiscount: number;
    stock: number;
    shortDescription: string;
    description: string;
    color: string;
    size: Size;
    images: string[];
    category: Category;
    createdBy: User;
    isMaster: boolean;
    createdAt: Date;
}
