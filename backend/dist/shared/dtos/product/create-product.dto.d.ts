import { Size } from './../../entities/product.entity';
export declare class CreateProductDto {
    price: number;
    name: string;
    description: string;
    color: string;
    size: Size;
    stock: number;
    categoryId: string;
    percentageDiscount: number;
    image: string;
}
