import { UsersService } from 'src/modules/users/users.service';
import { PasswordService } from './password/password.service';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { User } from 'src/shared/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly passwordService;
    private readonly jwtService;
    constructor(userService: UsersService, passwordService: PasswordService, jwtService: JwtService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    signin(email: string, password: string): Promise<string>;
    logout(): Promise<void>;
}
