import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateStockDto {
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
