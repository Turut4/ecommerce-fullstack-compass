import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';
import { User } from 'src/shared/entities/user.entity';
import { ProductResponse } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(admin: User, body: CreateProductDto): Promise<import("../../shared/entities/product.entity").Product>;
    findAllProducts(page: number, pageSize: number, category?: string, priceMin?: number, priceMax?: number, sort?: 'lower' | 'higher' | 'a-z' | 'z-a', search?: string): Promise<ProductResponse>;
    findProductsByName(name: string): Promise<import("../../shared/entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("../../shared/entities/product.entity").Product>;
    updateProduct(id: string, body: UpdateProductDto): Promise<import("../../shared/entities/product.entity").Product>;
    updateProductStock(id: string, body: UpdateStockDto): Promise<import("../../shared/entities/product.entity").Product>;
    deleteProduct(id: string): Promise<import("../../shared/entities/product.entity").Product>;
    generateRandomProducts(count: string): Promise<import("../../shared/entities/product.entity").Product[]>;
}
