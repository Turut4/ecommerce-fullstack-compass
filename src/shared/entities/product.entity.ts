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
import { Cart } from './cart.entity';
import { Category } from './category.entity';
import { Order } from './order.entity';
import { CartItem } from './cart-item.entity';

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

  @OneToMany(() => CartItem, (cartItems) => cartItems.product)
  cartItems: CartItem[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
