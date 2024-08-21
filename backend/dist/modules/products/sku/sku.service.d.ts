import { Product, Size } from 'src/shared/entities/product.entity';
export declare class SkuService {
    generateSku(product: Product): string;
    generateSizeCode(size: Size): string;
}
