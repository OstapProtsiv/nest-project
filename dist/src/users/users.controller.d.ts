import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private UserService;
    constructor(UserService: UsersService);
    getAll(): Promise<User[]>;
    createUser(userDto: CreateUserDto): Promise<User>;
}
