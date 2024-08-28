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
  UseGuards,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../shared/dtos/user/create-user.dto';
import { UserDto } from 'src/shared/dtos/user/user.dto';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { User } from 'src/shared/entities/user.entity';
import { LoginUserDto } from 'src/shared/dtos/user/login-user.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';
// import { AdminGuard } from 'src/shared/guards/admin.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard, AdminGuard)
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.usersService.create(
      body.email,
      body.password,
      body.username,
    );

    return user;
  }

  @Post('auth/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body);

    return user;
  }

  @Post('auth/signin')
  async signIn(@Body() body: LoginUserDto): Promise<any> {
    const jwt = await this.authService.signin(body.email, body.password);

    return jwt;
  }

  @UseGuards(AuthGuard)
  @Get('auth/logout')
  logOut(@Response() res: Response): void {
    this.authService.logout();
  }

  @UseGuards(AuthGuard)
  @Get('auth/whoiam')
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Patch('/updateMe')
  async updateMe(@Body() body: UpdateUserDto, @CurrentUser() user: User) {
    return this.usersService.update(user.id, body);
  }

  @Get()
  async findUsers(@Query('email') email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    return user;
  }

  @Delete('/deleteMe')
  @UseGuards(AuthGuard)
  async deleteMe(@CurrentUser() user: User) {
    return this.usersService.remove(user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Post('seed/:count')
  @UseGuards(AuthGuard, AdminGuard)
  async seedUsers(@Param('count') count: string): Promise<User[]> {
    return this.usersService.createRandomUsers(parseInt(count));
  }

  @Patch('turnadmin/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async turnAdmin(@Param('id') id: string) {
    return this.usersService.turnAdmin(id);
  }
}
