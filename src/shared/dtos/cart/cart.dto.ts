import { Expose, plainToClass, Transform } from 'class-transformer';
import { User } from 'src/shared/entities/user.entity';
import { UserDto } from '../user/user.dto';

export class CartDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  user: UserDto;
}
