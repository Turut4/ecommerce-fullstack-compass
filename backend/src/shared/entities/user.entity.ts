import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart/cart.entity';
import { Order } from './order/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];

  @Column({ default: false }) is_admin: boolean;
}
