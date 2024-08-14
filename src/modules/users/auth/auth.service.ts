import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { PasswordService } from './password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async signup(email: string, password: string, username: string) {
    const users = await this.userService.find(email);
    const hashedPassword = await this.passwordService.hashPassword(password);
    if (users.length) throw new BadRequestException('Email already in use');

    const user = this.userService.create(email, hashedPassword, username);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await this.passwordService.verifyPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Password not valid');

    return user;
  }
}
