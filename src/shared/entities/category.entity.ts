import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];
}
