import { UsersService } from 'src/modules/users/users.service';
import { PasswordService } from './password/password.service';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly passwordService;
    constructor(userService: UsersService, passwordService: PasswordService);
    signup(createUserDto: CreateUserDto): Promise<import("../../../shared/entities/user.entity").User>;
    signin(email: string, password: string): Promise<import("../../../shared/entities/user.entity").User>;
}
