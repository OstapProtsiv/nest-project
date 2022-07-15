import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanUserDto } from '../../dist/users/dto/ban-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { BannedUsers } from '../models/banned.users.model';
import { Roles } from '../models/roles.model';
import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Roles) private rolesRepository: typeof Roles,
    @InjectModel(BannedUsers) private bannedUsersRep: typeof BannedUsers,
  ) {}
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true } });
  }

  async createUser(userDto: CreateUserDto) {
    console.log(userDto);
    const candidate = await this.findUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'user with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.create(userDto);
    const defaultRole = await this.rolesRepository.findOne({
      where: { value: 'ADMIN' },
    });
    await user.$set('roles', defaultRole);
    user.roles = [defaultRole];
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  async giveRole(giveDto: GiveRoleDto): Promise<User> {
    const user = await this.userModel.findByPk(giveDto.userId);
    const roleToGive = await this.rolesRepository.findOne({
      where: { value: giveDto.role },
      include: { all: true },
    });
    if (roleToGive && user) {
      await user.$add('roles', roleToGive);
      return user;
    }
    throw new BadRequestException('wrong userId or role value');
  }
  async banUser(banDto: BanUserDto): Promise<BannedUsers> {
    return await this.bannedUsersRep.create(banDto);
  }
}
