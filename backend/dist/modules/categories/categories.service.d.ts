import { CreateCategoryDto } from 'src/shared/dtos/category/create-category.dto';
import { Category } from 'src/shared/entities/category.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
export declare class CategoriesService {
    private repo;
    private productsService;
    constructor(repo: Repository<Category>, productsService: ProductsService);
    resolveProducts(productsId: string[]): Promise<import("../../shared/entities/products/product.entity").Product[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, attrs: Partial<Category>): Promise<Category>;
    remove(id: string): Promise<Category>;
    getRandomCategory(): Promise<Category>;
    genreteRandomCategory(): Category;
    genrateRandomCategories(amount: number): Promise<Category[]>;
}
