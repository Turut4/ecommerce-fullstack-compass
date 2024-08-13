import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'shared/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository) {}

  async createUser(user) {}
}
