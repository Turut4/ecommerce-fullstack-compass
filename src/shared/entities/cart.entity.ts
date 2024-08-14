import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToMany(() => Product, (product) => product.carts)
  products: Product[];
}
