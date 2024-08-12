import { Entity, PrimaryColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('carts')
export class Cart {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;
}
