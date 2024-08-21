"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../shared/entities/category.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const { faker } = require('@faker-js/faker');
let CategoriesService = class CategoriesService {
    constructor(repo, productsService) {
        this.repo = repo;
        this.productsService = productsService;
    }
    async resolveProducts(productsId) {
        const products = Promise.all(productsId.map(async (p) => await this.productsService.findOne(p)));
        return products;
    }
    async create(createCategoryDto) {
        const category = this.repo.create(createCategoryDto);
        if (createCategoryDto.productsId?.length > 0)
            category.products = await this.resolveProducts(createCategoryDto.productsId);
        return this.repo.save(category);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findOne(id) {
        const category = await this.repo.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!category)
            throw new common_1.BadRequestException('Category not found');
        return category;
    }
    async update(id, attrs) {
        const category = await this.findOne(id);
        if (!category)
            throw new Error('Category not found');
        Object.assign(category, attrs);
        return this.repo.save(category);
    }
    async remove(id) {
        const category = await this.findOne(id);
        return this.repo.remove(category);
    }
    async getRandomCategory() {
        const categories = await this.findAll();
        return categories[Math.floor(Math.random() * categories.length)];
    }
    genreteRandomCategory() {
        const category = {
            name: faker.commerce.department(),
        };
        return category;
    }
    async genrateRandomCategories(amount) {
        const categories = await Promise.all(Array.from({ length: amount }, this.genreteRandomCategory));
        return await this.repo.save(categories);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map