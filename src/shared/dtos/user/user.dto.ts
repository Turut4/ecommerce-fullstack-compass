import { Expose, Transform } from 'class-transformer';
import { Cart } from 'src/shared/entities/cart.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => (obj.cart ? obj.cart.id : null))
  cart: Cart;
}
