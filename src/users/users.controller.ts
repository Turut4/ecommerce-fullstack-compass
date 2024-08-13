import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'shared/dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser();
  }
}
