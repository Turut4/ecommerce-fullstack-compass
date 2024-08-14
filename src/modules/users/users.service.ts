import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/shared/dtos/users/update-user.dto';
import { AuthService } from './auth/auth.service';
import { PasswordService } from './auth/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly passwordService: PasswordService,
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

  async findOne(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!id) return null;
    return user;
  }

  async update(id: string, body: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    if (body.password) {
      body.password = await this.passwordService.hashPassword(body.password);
    }

    Object.assign(user, body);

    return await this.repo.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }
}
