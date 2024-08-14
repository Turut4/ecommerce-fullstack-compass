import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  totalPrice: number;

  @OneToMany(() => Product, (product) => product.orders)
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
