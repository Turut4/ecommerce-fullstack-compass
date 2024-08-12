import { Entity, PrimaryColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('carts')
export class Cart {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(()=> Product, (product) => product.carts)
  products: Product[]
}
