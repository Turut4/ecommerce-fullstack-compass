import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { Order } from 'src/shared/entities/order/order.entity';
import { Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  orderItemRepo: any;
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) orderItemRepo: Repository<OrderItem>,
    private readonly cartService: CartsService,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string) {
    const cart = await this.cartService.findByUser(userId);
    const order = this.orderRepo.create({
      user: await this.usersService.findOne(userId),
      orderItems: cart.cartItems.map((item) => {
        const orderItem = this.orderItemRepo.create({
          product: item.product,
          quantity: item.quantity,
        });
        this.orderItemRepo.save(orderItem);
        return orderItem;
      }),
    });
  }
}
