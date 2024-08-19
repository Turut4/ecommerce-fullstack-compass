import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity('cart_item')
export class CartItem {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Product, (products) => products.cartItems)
  product: Product;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;
}
