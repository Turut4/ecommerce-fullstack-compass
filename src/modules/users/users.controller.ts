import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Delete,
  Session,
  Patch,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../shared/dtos/user/create-user.dto';
import { UserDto } from 'src/shared/dtos/user/user.dto';
import { Serialize } from 'src/modules/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { User } from 'src/shared/entities/user.entity';
import { LoginUserDto } from 'src/shared/dtos/user/login-user.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.username,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: LoginUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/signout')
  signout(@Session() session: any): void {
    session.userId = null;
  }

  @Get('/whoiam')
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Get()
  async findAllUsers(@Query('email') email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
