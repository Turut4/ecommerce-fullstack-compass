import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { Order } from 'src/shared/entities/order/order.entity';
import { Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from 'src/shared/dtos/order/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    private readonly cartService: CartsService,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const cart = await this.cartService.findByUser(userId);
    const order = this.orderRepo.create({
      user: await this.usersService.findOne(userId),
      orderItems: cart.cartItems.map((cartItem) => {
        const orderItem = this.orderItemRepo.create({
          product: cartItem.product,
          quantity: cartItem.quantity,
        });
        return orderItem;
      }),
      total: cart.total,
      address: createOrderDto.address,
    });
    return this.orderRepo.save(order);
  }

  async findAll() {
    return this.orderRepo.find({ relations: ['user', 'orderItems'] });
  }

  async findByUser(userId: string) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'orderItems'],
    });
  }

  async findOne(id: string) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderItems'],
    });
  }

  async delete(id: string) {
    return this.orderRepo.delete(id);
  }
}
