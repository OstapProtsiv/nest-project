import { BannedUsers } from 'src/models/banned.users.model';
import { Roles } from 'src/models/roles.model';
import { User } from 'src/models/user.model';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
export declare class UsersService {
    private userModel;
    private rolesRepository;
    private bannedUsersRep;
    constructor(userModel: typeof User, rolesRepository: typeof Roles, bannedUsersRep: typeof BannedUsers);
    getAllUsers(): Promise<User[]>;
    createUser(userDto: CreateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    giveRole(giveDto: GiveRoleDto): Promise<User>;
    banUser(banDto: BanUserDto): Promise<BannedUsers>;
}
