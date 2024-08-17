import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  totalPrice: number;

  @ManyToMany(() => Product, (product) => product.orders, { eager: true })
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
