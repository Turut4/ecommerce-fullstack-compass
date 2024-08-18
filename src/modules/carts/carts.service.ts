import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCartDto } from 'src/shared/dtos/cart/update-cart.dto';
import { Cart } from 'src/shared/entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private repo: Repository<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  async create(): Promise<Cart> {
    const newCart = this.repo.create();

    return await this.repo.save(newCart);
  }

  async findOne(id: string): Promise<Cart> {
    return await this.repo.findOne({
      where: { id },
      relations: ['user', 'products'],
    });
  }

  async findByUser(userId: string): Promise<Cart> {
    return await this.repo.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'products'],
    });
  }

  async findAll(): Promise<Cart[]> {
    return await this.repo.find({ relations: ['user', 'products'] });
  }

  async addProduct(userId: string, productId: string): Promise<Cart> {
    const cartToUpdate = await this.findByUser(userId);
    if (!cartToUpdate) return this.create();

    const product = await this.productsService.findOne(productId);

    if (!product) throw new Error('Product not found');

    cartToUpdate.products.push(product);
    console.log(product);

    return await this.repo.save(cartToUpdate);
  }

  async remove(id: string): Promise<void> {
    const cart = await this.findOne(id);
    cart.user = null;
    await this.repo.delete(id);
  }

  async removeUselessCarts() {
    const carts = await this.findAll();
    carts.forEach(async (cart) => {
      if (cart.user === null) {
        await this.repo.delete(cart.id);
      }
    });
  }
}
