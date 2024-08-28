import { CreateOrderItemDto } from './create-order-item.dto';
export declare class CreateOrderDto {
    name: string;
    createOrderItems: CreateOrderItemDto[];
    address: string;
    email: string;
    company?: string;
    additional_information?: string;
}
