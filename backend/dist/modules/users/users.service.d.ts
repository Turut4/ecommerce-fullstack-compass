import { User } from '../../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { PasswordService } from './auth/password/password.service';
import { CartsService } from '../carts/carts.service';
export declare class UsersService {
    private readonly repo;
    private readonly passwordService;
    private readonly cartService;
    constructor(repo: Repository<User>, passwordService: PasswordService, cartService: CartsService);
    create(email: string, password: string, username: string): Promise<User>;
    find(email: string): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    createRandomUsers(count: number): Promise<User[]>;
    populateCarts(): Promise<void>;
}
