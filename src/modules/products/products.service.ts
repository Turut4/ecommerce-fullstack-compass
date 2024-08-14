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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly skuService: SkuService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const [storedProducts] = await this.find(createProductDto.name);

    if (storedProducts)
      throw new BadRequestException('This product aready exists');

    const product = this.repo.create(createProductDto);

    return await this.repo.save(product);
  }

  async find(name: string): Promise<Product[]> {
    return await this.repo.find({ where: { name } });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not Found...');

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);

    return await this.repo.save(product);
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    console.log(product);
    if (!product) throw new NotFoundException('product not found');
    return this.repo.remove(product);
  }
}
