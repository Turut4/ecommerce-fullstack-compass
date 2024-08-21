import { Category } from './category.entity';
export declare enum Size {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}
export declare class Product {
    id: string;
    sku: string;
    name: string;
    price: number;
    percentageDiscount: number;
    stock: number;
    description: string;
    color: string;
    size: Size;
    image: string;
    category: Category;
}