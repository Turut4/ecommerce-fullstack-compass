import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (products) => products.order)
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
