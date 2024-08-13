import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(email: string, password: string, username: string) {
    const users = await this.userService.find(email);
    if (users.length) throw new BadRequestException('Email already in use');
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = this.userService.create(email, result, username);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Invalid credentials');

    return user;
  }
}
