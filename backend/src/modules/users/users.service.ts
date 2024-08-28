import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { PasswordService } from './auth/password/password.service';

const { faker } = require('@faker-js/faker');

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
    const existingUsers = await this.repo.find();
    const user = this.repo.create({ email, password, username });

    if (existingUsers.length <= 0) {
      user.is_admin = true;
    }

    return this.repo.save(user);
  }

  async find(email: string): Promise<User[]> {
    const users = await this.repo.findBy({ email });

    return users;
  }

  async findOne(id: string) {
    const user = await this.repo.findOneBy({ id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);

    const isPasswordValid = await this.passwordService.verifyPassword(
      updateUserDto.confirmPassword,
      user.password,
    );

    if (!isPasswordValid)
      throw new BadRequestException('Password is not correct');

    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordService.hashPassword(
        updateUserDto.password,
      );
    }

    Object.assign(user, updateUserDto);

    return await this.repo.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }

  async createRandomUsers(count: number): Promise<User[]> {
    if (process.env.NODE_ENV === 'development') {
      function createRandomUser(): User {
        return {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          username: faker.internet.userName(),
        } as User;
      }

      const users: User[] = await Promise.all(
        Array.from({ length: count }, async () => {
          const user = createRandomUser();

          return user;
        }),
      );

      return await this.repo.save(users);
    }
  }

  async turnAdmin(id: string) {
    const user = await this.findOne(id);
    user.is_admin = true;
    return this.repo.save(user);
  }
}
