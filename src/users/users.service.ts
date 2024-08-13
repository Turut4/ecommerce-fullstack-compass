import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../shared/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, username: string) {
    const newUser = await this.usersRepository.create({ email, password });
    return await this.usersRepository.save(newUser);
  }
}
