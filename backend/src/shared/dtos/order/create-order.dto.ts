import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  name: string;
  @IsArray()
  createOrderItems: CreateOrderItemDto[];

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsOptional()
  company?: string;

  @IsOptional()
  additional_information?: string;
}
