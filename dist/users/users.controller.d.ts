import { User } from 'src/models/user.model';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private UserService;
    constructor(UserService: UsersService);
    getAll(): Promise<User[]>;
    createUser(userDto: CreateUserDto): Promise<User>;
    giveRole(giveDto: GiveRoleDto): Promise<User>;
    banUser(banUserDto: BanUserDto): Promise<import("../models/banned.users.model").BannedUsers>;
}
