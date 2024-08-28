import { IsArray, IsString } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsArray()
  createOrderItems: CreateOrderItemDto[];

  @IsString()
  address: string;
}
