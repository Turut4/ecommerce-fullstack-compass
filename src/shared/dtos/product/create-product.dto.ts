import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
} from 'class-validator';

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
  size: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  @Max(40)
  percentageDiscount: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
