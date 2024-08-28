import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { PasswordService } from './password/password.service';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const users = await this.userService.find(email);
    const hashedPassword = await this.passwordService.hashPassword(password);

    if (users.length) throw new BadRequestException('Email already in use');
    const jwt = this.jwtService.sign({ token: '' });

    const user = await this.userService.create(email, hashedPassword, username);
    return { ...user, jwt };
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new BadRequestException('Invalid credentials');
    console.log(user);

    const isPasswordValid = await this.passwordService.verifyPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Password not valid');

    const { password: _, ...payload } = user;
    const jwt = this.jwtService.sign({ access_token: payload });

    return { ...user, jwt };
  }

  async logout() {
    this.jwtService.sign({ sub: '' }, { expiresIn: '1s' });
  }
}
