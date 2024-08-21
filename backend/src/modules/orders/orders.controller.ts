import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/shared/dtos/order/create-order.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';

@Controller('orders')
@UseGuards(AuthGuard, AdminGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('/:id')
  async create(@Param('id') userId: string, @Body() body: CreateOrderDto) {
    return this.orderService.create(userId, body);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get('/user/:id')
  async findByUser(@Param('id') userId: string) {
    return this.orderService.findByUser(userId);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
