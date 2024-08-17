import { IsNotEmpty } from 'class-validator';
import { User } from 'src/shared/entities/user.entity';

export class CreateCartDto {
  @IsNotEmpty()
  user: User;
}
