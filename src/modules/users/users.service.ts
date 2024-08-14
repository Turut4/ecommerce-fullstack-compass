import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/shared/dtos/users/update-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { AuthService } from '../auth/auth.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(email: string, password: string, username: string) {
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }

  async find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async findOne(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!id) return null;
    return user;
  }

  async update(id: string, body: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    if (body.password) {
      body.password = await this.authService.hashPassword(body.password);
    }

    Object.assign(user, body);

    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }
}
