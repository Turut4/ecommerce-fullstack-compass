import { Expose, plainToClass, Transform, Type } from 'class-transformer';

import { UserDto } from '../user/user.dto';

export class CartDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  cartItems: any[];
}
