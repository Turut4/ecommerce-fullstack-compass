import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/shared/dtos/product/update-product.dto';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';
import { SkuService } from './sku/sku.service';
import { UpdateStockDto } from 'src/shared/dtos/product/update-stock.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly skuService: SkuService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const sku = this.skuService.generateSku(createProductDto);

    const existingProduct = await this.repo.findOne({ where: { sku } });
    if (existingProduct) {
      throw new BadRequestException('This product already exists...');
    }

    const product = this.repo.create({ ...createProductDto, sku });

    return await this.repo.save(product);
  }

  async find(name: string): Promise<Product[]> {
    return await this.repo.find({ where: { name } });
  }

  async findOne(sku: string): Promise<Product> {
    const product = await this.repo.findOneBy({ sku });
    if (!product) throw new NotFoundException('Product not Found...');

    return product;
  }

  async update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(sku);

    Object.assign(product, updateProductDto);

    return await this.repo.save(product);
  }

  async updateStock(sku: string, newStock: UpdateStockDto) {
    const product = await this.findOne(sku);

    if (!product) {
      throw new Error(`Product with sku ${sku} not found`);
    }

    product.stock += newStock.stock;

    return this.repo.save(product);
  }

  async delete(sku: string) {
    const product = await this.findOne(sku);
    console.log(product);
    if (!product) throw new NotFoundException('product not found');
    return this.repo.remove(product);
  }
}
