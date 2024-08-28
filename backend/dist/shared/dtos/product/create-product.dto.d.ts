import { Size } from '../../entities/products/product.entity';
export declare class CreateProductDto {
    price: number;
    name: string;
    description: string;
    shortDescription: string;
    color: string;
    size: Size;
    stock: number;
    categoryId: string;
    percentageDiscount: number;
    images: string[];
}
