import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Cart, (carts) => carts.user)
  carts: Cart[];

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];
}
