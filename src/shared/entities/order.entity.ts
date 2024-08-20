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

 // @OneToOne(()=> Cart, cart => cart.)

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
