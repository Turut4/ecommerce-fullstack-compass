import { UserDto } from '../user/user.dto';
import { Product } from 'src/shared/entities/product.entity';
export declare class CartDto {
    id: string;
    user: UserDto;
    item: Product[];
}
