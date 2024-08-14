import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column()
  size: string;

  @Column()
  image: string;

  @ManyToOne(() => Order, (order) => order.products)
  orders: Order[];

  @ManyToMany(() => Cart, (cart) => cart.products)
  @JoinTable()
  carts: Cart[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
