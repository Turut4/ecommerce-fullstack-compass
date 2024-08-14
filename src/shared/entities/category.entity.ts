import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
