import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { Product } from 'src/shared/entities/products/product.entity';
import { Repository } from 'typeorm';
import { SkuService } from './sku/sku.service';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';
import { CategoriesService } from '../categories/categories.service';
import { User } from 'src/shared/entities/user.entity';
interface ProductFilter {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    sort?: 'lower' | 'higher' | 'a-z' | 'z-a';
    search?: string;
}
export interface ProductResponse {
    products: Product[];
    total: number;
    currentPage: number;
    totalPages: number;
}
export declare class ProductsService {
    private readonly repo;
    private readonly skuService;
    private readonly categoriesService;
    constructor(repo: Repository<Product>, skuService: SkuService, categoriesService: CategoriesService);
    create(admin: User, createProductDto: CreateProductDto): Promise<Product>;
    findAll(filters: ProductFilter, page: number, pageSize: number): Promise<ProductResponse>;
    findManyByName(name: string): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    findOneVariant(id: string, color: string, size: string): Promise<Product>;
    update(sku: string, updateProductDto: UpdateProductDto): Promise<Product>;
    updateStock(sku: string, newStock: UpdateStockDto): Promise<Product>;
    delete(sku: string): Promise<Product>;
    generateProduct(): Promise<Product>;
    generateRandomProducts(count: number): Promise<Product[]>;
}
export {};
