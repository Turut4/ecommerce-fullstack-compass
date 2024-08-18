import { Expose, plainToClass, Transform } from 'class-transformer';
import { User } from 'src/shared/entities/user.entity';
import { UserDto } from '../user/user.dto';
import { Product } from 'src/shared/entities/product.entity';

export class CartDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  user: UserDto;

  @Expose()
  @Transform(({ obj }) => obj.products)
  products: Product[];
}
