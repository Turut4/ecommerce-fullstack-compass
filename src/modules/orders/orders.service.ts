import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { Order } from 'src/shared/entities/order/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) orderItemRepo: Repository<OrderItem>,
  ) {}

  async create() {}
}
