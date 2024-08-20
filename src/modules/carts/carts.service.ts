import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCartDto } from 'src/shared/dtos/cart/update-cart.dto';
import { Cart } from 'src/shared/entities/cart/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from 'src/shared/dtos/cart/add-to-cart.dto';
import { CartItem } from 'src/shared/entities/cart/cart-item.entity';

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

    if (!userCart) throw new BadRequestException('Cart not found');

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
    console.log(cartToUpdate.cartItems);

    return await this.cartRepo.save(cartToUpdate);
  }

  async increaseProductQuantity(
    userId: string,
    productId: string,
  ): Promise<Cart> {
    const cartToUpdate = await this.findByUser(userId);

    if (!cartToUpdate) {
      throw new Error('Cart not found');
    }

    const item = cartToUpdate.cartItems.find(
      (item) => item.product.id === productId,
    );

    if (!item) {
      throw new Error('Product not found in cart');
    }

    item.quantity++;

    return await this.cartRepo.save(cartToUpdate);
  }

  async decreaseProductQuantity(
    userId: string,
    productId: string,
  ): Promise<Cart> {
    const cartToUpdate = await this.findByUser(userId);

    if (!cartToUpdate) {
      throw new Error('Cart not found');
    }

    const item = cartToUpdate.cartItems.find(
      (item) => item.product.id === productId,
    );

    if (!item) {
      throw new Error('Product not found in cart');
    }

    if (item.quantity === 1) {
      return this.removeProduct(userId, productId);
    }

    item.quantity--;

    return await this.cartRepo.save(cartToUpdate);
  }

  async removeProduct(userId: string, productId: string): Promise<Cart> {
    const cartToUpdate = await this.findByUser(userId);

    if (!cartToUpdate) {
      throw new Error('Cart not found');
    }

    const itemIndex = cartToUpdate.cartItems.findIndex(
      (item) => item.product.id === productId,
    );

    if (itemIndex === -1) {
      throw new Error('Product not found in cart');
    }

    cartToUpdate.cartItems.splice(itemIndex, 1);

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
