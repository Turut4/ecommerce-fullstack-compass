import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  address: string;
}
