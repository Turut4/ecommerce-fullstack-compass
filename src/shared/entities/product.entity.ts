import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column()
  percentageDiscount: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Cart, (cart) => cart.products)
  carts: Cart[];

  @ManyToOne(() => Order, (order) => order.products)
  order: Order[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
