import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCartDto } from 'src/shared/dtos/cart/update-cart.dto';
import { Cart } from 'src/shared/entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';
import { CartItem } from 'src/shared/entities/cart-item.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async create(): Promise<Cart> {
    const newCart = this.cartRepo.create();

    return await this.cartRepo.save(newCart);
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartRepo.findOne({
      where: { id },
      relations: ['user', 'cartItems'],
    });
  }

  async findByUser(userId: string): Promise<Cart> {
    const userCart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'cartItems'],
    });

    if (!userCart) return this.create();

    return userCart;
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepo.find({ relations: ['user', 'cartItems'] });
  }

  async addProduct(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const cartToUpdate = await this.findByUser(userId);

    if (!cartToUpdate) return this.create();

    const product = await this.productsService.findOne(addToCartDto.productId);

    if (!product) throw new Error('Product not found');
    const item = this.cartItemRepo.create({
      cart: cartToUpdate,
      quantity: addToCartDto.quantity,
      product,
    });

    cartToUpdate.cartItems.push(item);

    return await this.cartRepo.save(cartToUpdate);
  }

  async remove(id: string): Promise<void> {
    const cart = await this.findOne(id);
    cart.user = null;
    await this.cartRepo.delete(id);
  }

  async removeUselessCarts() {
    const carts = await this.findAll();
    carts.forEach(async (cart) => {
      if (cart.user === null) {
        await this.cartRepo.delete(cart.id);
      }
    });
  }
}
