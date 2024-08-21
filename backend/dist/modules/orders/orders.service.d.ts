import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { Order } from 'src/shared/entities/order/order.entity';
import { Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from 'src/shared/dtos/order/create-order.dto';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly cartService;
    private readonly usersService;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, cartService: CartsService, usersService: UsersService);
    create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByUser(userId: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
