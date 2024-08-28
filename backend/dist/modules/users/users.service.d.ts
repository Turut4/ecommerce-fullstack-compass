import { User } from '../../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { PasswordService } from './auth/password/password.service';
export declare class UsersService {
    private readonly repo;
    private readonly passwordService;
    constructor(repo: Repository<User>, passwordService: PasswordService);
    create(email: string, password: string, username: string): Promise<User>;
    find(email: string): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    createRandomUsers(count: number): Promise<User[]>;
    turnAdmin(id: string): Promise<User>;
}
