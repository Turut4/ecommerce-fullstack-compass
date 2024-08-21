import { Size } from 'src/shared/entities/product.entity';
export declare class UpdateProductDto {
    name?: string;
    price?: number;
    description: string;
    color?: string;
    stock: number;
    size: Size;
    percentageDiscount: number;
}
