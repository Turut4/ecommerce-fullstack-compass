import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { User } from '../user.entity';

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
