import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({unique: true})
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Cart, (carts) => carts.user)
  cart: Cart;

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];
}
