import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from 'src/shared/entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [User],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
