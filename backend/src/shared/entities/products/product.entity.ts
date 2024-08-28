import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../category.entity';
import { User } from '../user.entity';
import { Transform } from 'class-transformer';
import { MaxLength } from 'class-validator';

export enum Size {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
  EXTRALARGE = 'XL',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  percentageDiscount: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 'lorem ipsum' })
  shortDescription: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column({ default: 'M', type: 'enum', enum: Size })
  size: Size;

  @Column('simple-array')
  @MaxLength(5)
  images: string[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;

  @Column({ default: true })
  isMaster: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
