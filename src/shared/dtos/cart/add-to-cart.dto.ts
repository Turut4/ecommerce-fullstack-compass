import { IsString, IsNumber, IsUUID } from 'class-validator';
export class AddToCartDto {
  @IsUUID()
  userId: string;

  @IsString()
  productSku: string;

  @IsNumber()
  quantity: number;
}
