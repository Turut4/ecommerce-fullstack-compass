import {
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinTable()
  user: User;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
  
  @ManyToMany(() => Product, (product) => product.carts)
  products: Product[];
}
