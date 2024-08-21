import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Cart } from './cart/cart.entity';
import { Category } from './category.entity';
import { Order } from './order/order.entity';
import { CartItem } from './cart/cart-item.entity';

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  percentageDiscount: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column({ default: 'medium', type: 'enum', enum: Size })
  size: Size;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

}