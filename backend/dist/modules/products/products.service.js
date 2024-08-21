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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../shared/entities/product.entity");
const typeorm_2 = require("typeorm");
const sku_service_1 = require("./sku/sku.service");
const categories_service_1 = require("../categories/categories.service");
const { faker } = require('@faker-js/faker');
let ProductsService = class ProductsService {
    constructor(repo, skuService, categoriesService) {
        this.repo = repo;
        this.skuService = skuService;
        this.categoriesService = categoriesService;
    }
    async create(createProductDto) {
        const product = this.repo.create(createProductDto);
        product.sku = this.skuService.generateSku(product);
        const productExists = await this.repo.findOne({
            where: { sku: product.sku },
        });
        if (productExists) {
            throw new common_1.BadRequestException('This product already exists...');
        }
        product.category = await this.categoriesService.findOne(createProductDto.categoryId);
        return await this.repo.save(product);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findManyByName(name) {
        return await this.repo
            .createQueryBuilder()
            .where('name LIKE :name', { name: `%${name}%` })
            .getMany();
    }
    async findOne(id) {
        const product = await this.repo.findOneBy({ id });
        if (!product)
            throw new common_1.NotFoundException('Product not Found...');
        return product;
    }
    async update(sku, updateProductDto) {
        const product = await this.findOne(sku);
        Object.assign(product, updateProductDto);
        product.sku = this.skuService.generateSku(product);
        return await this.repo.save(product);
    }
    async updateStock(sku, newStock) {
        const product = await this.findOne(sku);
        if (!product) {
            throw new Error(`Product with sku ${sku} not found`);
        }
        product.stock += newStock.stock;
        return this.repo.save(product);
    }
    async delete(sku) {
        const product = await this.findOne(sku);
        if (!product)
            throw new common_1.NotFoundException('product not found');
        return this.repo.remove(product);
    }
    async generateProduct() {
        const category = await this.categoriesService.getRandomCategory();
        const product = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            color: faker.color.rgb(),
            stock: faker.number.int({ min: 0, max: 100 }),
            image: faker.image.url(),
            size: faker.helpers.arrayElement(['small', 'medium', 'large']),
            percentageDiscount: faker.number.int({ min: 0, max: 40 }),
            category,
        };
        product.sku = this.skuService.generateSku(product);
        return product;
    }
    async generateRandomProducts(count) {
        const products = await Promise.all(Array.from({ length: count }, async () => await this.generateProduct()));
        return await this.repo.save(products);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => categories_service_1.CategoriesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sku_service_1.SkuService,
        categories_service_1.CategoriesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map