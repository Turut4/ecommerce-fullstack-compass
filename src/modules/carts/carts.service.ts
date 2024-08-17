import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/shared/entities/cart.entity';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async create(): Promise<Cart> {
    const cart = this.repo.create();

    return await this.repo.save(cart);
  }

  async findOne(id: string): Promise<Cart> {
    return await this.repo.findOneBy({ id });
  }

  async findByUser(user: User): Promise<Cart> {
    return await this.repo.findOneBy({ user });
  }

  async findAll(): Promise<Cart[]> {
    return await this.repo.find();
  }

  async update(cart: Cart): Promise<Cart> {
    return await this.repo.save(cart);
  }

  async remove(id: string): Promise<void> {
    console.log(id);
    const cart = await this.findOne(id);
    cart.user = null;
    await this.repo.delete(id);
  }
}
