import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product.entity';
import { Cart } from './cart.entity';

@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;
}
