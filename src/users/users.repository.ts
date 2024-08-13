import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'shared/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User) private useRepository: Repository<User>,
  ) {}
}
