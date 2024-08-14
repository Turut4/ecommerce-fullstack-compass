import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
  MinLength,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  size: string;

  @IsOptional()
  @IsNumber()
  @Max(40)
  percentageDiscount: number;
}
