import { UsersService } from 'src/modules/users/users.service';
import { PasswordService } from './password/password.service';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly passwordService;
    private readonly jwtService;
    constructor(userService: UsersService, passwordService: PasswordService, jwtService: JwtService);
    signup(createUserDto: CreateUserDto): Promise<{
        jwt: string;
        id: string;
        email: string;
        password: string;
        username: string;
        created_at: Date;
        updated_at: Date;
        orders: import("../../../shared/entities/order/order.entity").Order[];
        is_admin: boolean;
    }>;
    signin(email: string, password: string): Promise<{
        jwt: string;
        id: string;
        email: string;
        password: string;
        username: string;
        created_at: Date;
        updated_at: Date;
        orders: import("../../../shared/entities/order/order.entity").Order[];
        is_admin: boolean;
    }>;
    logout(): Promise<void>;
}
