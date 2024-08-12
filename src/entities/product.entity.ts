import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  percentage_discount: number;

  @Column()
  description: string;

  @Column()
  image: string;

  
}
