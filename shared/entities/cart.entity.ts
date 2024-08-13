import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToOne,
  OneToMany,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  products: Product[];
}
