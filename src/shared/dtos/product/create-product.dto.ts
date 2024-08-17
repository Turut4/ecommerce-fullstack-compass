import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  IsEmpty,
} from 'class-validator';

import { Size } from './../../entities/product.entity';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  description: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: Size;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsNumber()
  @Max(40)
  percentageDiscount: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
