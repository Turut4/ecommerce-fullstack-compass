import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/shared/entities/order/order-item.entity';
import { Order } from 'src/shared/entities/order/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from 'src/shared/dtos/order/create-order.dto';
import { ProductsService } from '../products/products.service';
import { CreateOrderItemDto } from 'src/shared/dtos/order/create-order-item.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async createOrderItem(createOrderItem: CreateOrderItemDto[]) {
    const orderItems = createOrderItem.map(async (item): Promise<OrderItem> => {
      const product = await this.productsService.findOne(item.productId);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await this.productsService.updateStock(product.id, {
          stock: product.stock,
        });
      } else {
        throw new BadRequestException(
          product.stock > 0
            ? `We have only ${product.stock} of ${product.name}`
            : `Product ${product.name} is out of stock`,
        );
      }

      if (!product) throw new NotFoundException('Product not found');

      return this.orderItemRepo.create({ product, quantity: item.quantity });
    });

    return Promise.all(orderItems);
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { createOrderItems, address, name, additional_information, company } =
      createOrderDto;

    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const orderItems = await this.createOrderItem(createOrderItems);
    const total = orderItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const order = this.orderRepo.create({
      name,
      company,
      additional_information,
      user,
      orderItems,
      address,
      total,
    });
    console.log(order);
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
