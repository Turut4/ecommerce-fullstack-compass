import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  totalPrice: number;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinTable()
  cart: Cart;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
