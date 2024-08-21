import { CreateCategoryDto } from 'src/shared/dtos/category/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from 'src/shared/entities/category.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(body: CreateCategoryDto): Promise<Category>;
    getCategories(): Promise<Category[]>;
    findOneCategory(name: string): Promise<Category>;
    updateCategory(id: string, attrs: Partial<Category>): Promise<Category>;
    removeCategory(id: string): Promise<Category>;
    seedCategories(amount: number): Promise<Category[]>;
}
