import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    registration(userDto: CreateUserDto): Promise<string>;
    login(userDto: CreateUserDto): Promise<string>;
}
