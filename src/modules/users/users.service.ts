import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }

  async find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!id) return null;
    return user;
  }

  async remove(id: string): Promise<any> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }
}
