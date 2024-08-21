import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';
import { User } from '../user.entity';
import { CartItem } from './cart-item.entity';
import { Transform } from 'class-transformer';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CartItem, (cartItems) => cartItems.cart, {
    eager: true,
    cascade: true,
  })
  cartItems: CartItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @AfterLoad()
  @BeforeInsert()
  @BeforeUpdate()
  async calculateTotal() {
    if (this.cartItems && this.cartItems.length > 0) {
      this.total = this.cartItems.reduce((acc, item) => {
        if (item.product) {
          return acc + item.product.price * item.quantity;
        } else {
          console.error(`CartItem without Product:`, item);
          return acc;
        }
      }, 0);
    } else {
      this.total = 0;
    }
  }
}
