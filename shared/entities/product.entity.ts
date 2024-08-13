import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  percentage_discount: number;

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
