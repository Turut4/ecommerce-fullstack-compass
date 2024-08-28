import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  IsEmpty,
  IsArray,
} from 'class-validator';

import { Size } from '../../entities/products/product.entity';

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
  description: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

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
  @IsArray()
  images: string[];

}
