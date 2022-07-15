import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private jwtService;
    private UsersService;
    constructor(jwtService: JwtService, UsersService: UsersService);
    login(userDto: CreateUserDto): Promise<string>;
    registration(userDto: CreateUserDto): Promise<string>;
    private createToken;
    private validateUser;
}
