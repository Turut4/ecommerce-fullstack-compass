import { Product, Size } from 'src/shared/entities/products/product.entity';
export declare class SkuService {
    generateSku(product: Product): string;
    generateSizeCode(size: Size): string;
}
