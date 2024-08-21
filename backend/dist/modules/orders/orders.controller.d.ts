import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/shared/dtos/order/create-order.dto';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    create(userId: string, body: CreateOrderDto): Promise<import("../../shared/entities/order/order.entity").Order>;
    findAll(): Promise<import("../../shared/entities/order/order.entity").Order[]>;
    findOne(id: string): Promise<import("../../shared/entities/order/order.entity").Order>;
    findByUser(userId: string): Promise<import("../../shared/entities/order/order.entity").Order[]>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
