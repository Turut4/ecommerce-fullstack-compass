import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { Size } from 'src/shared/entities/products/product.entity';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  @Min(16)
  description: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsString()
  @IsOptional()
  size: Size;

  @IsOptional()
  @IsNumber()
  @Max(40)
  percentageDiscount: number;
}
