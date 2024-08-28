import { UsersService } from './users.service';
import { CreateUserDto } from '../../shared/dtos/user/create-user.dto';
import { AuthService } from './auth/auth.service';
import { User } from 'src/shared/entities/user.entity';
import { LoginUserDto } from 'src/shared/dtos/user/login-user.dto';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signUp(body: CreateUserDto): Promise<User>;
    signIn(body: LoginUserDto): Promise<any>;
    logOut(res: Response): void;
    whoAmI(user: User): Promise<User>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
    updateMe(body: UpdateUserDto, user: User): Promise<User>;
    findUsers(email: string): Promise<User[]>;
    findUser(id: string): Promise<User>;
    deleteMe(user: User): Promise<User>;
    deleteUser(id: string): Promise<User>;
    seedUsers(count: string): Promise<User[]>;
    turnAdmin(id: string): Promise<User>;
}
