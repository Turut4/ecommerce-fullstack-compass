import { IsString, Length } from 'class-validator';

export class UpdateCartDto {
  @IsString()
  @Length(8,8)
  productsId: string;
}
