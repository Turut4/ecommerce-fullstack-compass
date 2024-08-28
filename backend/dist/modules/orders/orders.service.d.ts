import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { Order } from 'src/shared/entities/order/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from 'src/shared/dtos/order/create-order.dto';
import { ProductsService } from '../products/products.service';
import { CreateOrderItemDto } from 'src/shared/dtos/order/create-order-item.dto';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly usersService;
    private readonly productsService;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, usersService: UsersService, productsService: ProductsService);
    createOrderItem(createOrderItem: CreateOrderItemDto[]): Promise<OrderItem[]>;
    create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByUser(userId: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
