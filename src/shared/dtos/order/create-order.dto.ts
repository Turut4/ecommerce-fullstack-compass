import { IsString, IsNumber, } from "class-validator";

export class CreateOrderDto {
    
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;
}