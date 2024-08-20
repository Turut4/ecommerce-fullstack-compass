import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Cart } from '../cart/cart.entity';

export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: OrderItem;
}
