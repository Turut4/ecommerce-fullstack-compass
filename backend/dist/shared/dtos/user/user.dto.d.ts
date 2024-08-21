import { Cart } from 'src/shared/entities/cart/cart.entity';
export declare class UserDto {
    id: number;
    username: string;
    email: string;
    cart: Cart;
    is_admin: boolean;
}
