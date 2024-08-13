import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'shared/entities/user.entity';

@Module({
  imports: [User],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
