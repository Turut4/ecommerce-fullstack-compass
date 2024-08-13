import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  NotFoundException,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../shared/dtos/users/createUser.dto';
import { UserDto } from 'src/shared/dtos/users/user.dto';
import { Serialize } from 'src/modules/interceptors/serialize.interceptor';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/shared/entities/user.entity';
import { LoginUserDto } from 'src/shared/dtos/users/loginUser.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
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
    console.log(session);
    return user;
  }

  @Get('/signout')
  async signout(@Session() session: any): Promise<void> {
    session.userId = null;
  }

  @Get('/whoiam')
  async whoAmI(@CurrentUser() user: User) {
    return user;
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
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(id);
  }
}
