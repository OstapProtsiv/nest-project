import { Roles } from 'src/models/roles.model';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    private rolesRepository;
    constructor(userModel: typeof User, rolesRepository: typeof Roles);
    getAllUsers(): Promise<User[]>;
    createUser(userDto: CreateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
}
