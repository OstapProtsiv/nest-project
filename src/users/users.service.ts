import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
// import { BannedUsers } from '../models/banned.users.model';
// import { Roles } from '../models/roles.model';
// import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Roles } from '../entity/role.entity';
import { BannedUsers } from '../entity/banned.users.entiy';
import { Repository } from 'typeorm';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    // @InjectModel(User) private userModel: typeof User,
    // @InjectModel(Roles) private rolesRepository: typeof Roles,
    // @InjectModel(BannedUsers) private bannedUsersRep: typeof BannedUsers,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Roles) private roleRepository: Repository<Roles>,
    @InjectRepository(BannedUsers)
    private bannedUsersRep: Repository<BannedUsers>,
  ) {}
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: { roles: true, posts: true, bannedUser: true },
    });
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

    const user = this.userRepository.create(userDto);
    const defaultRole = await this.roleRepository.findOne({
      where: { value: 'ADMIN' },
    });
    // user.roles.push(defaultRole);
    user.roles = [defaultRole];
    this.userRepository.save(user);
    // await user.$set('roles', defaultRole);
    // user.roles = [defaultRole];
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: { bannedUser: true, posts: true, roles: true },
    });
    // return this.userRepository.find({ where: { email } });
  }

  async giveRole(giveDto: GiveRoleDto): Promise<User> {
    // const user = await this.userModel.findByPk(giveDto.userId);
    const user = await this.userRepository.findOne({
      where: { id: giveDto.userId },
    });
    // const roleToGive = await this.rolesRepository.findOne({
    //   where: { value: giveDto.role },
    //   include: { all: true },
    // });
    const roleToGive = await this.roleRepository.findOne({
      where: { value: giveDto.role },
    });
    if (roleToGive && user) {
      // await user.$add('roles', roleToGive);
      user.roles.push(roleToGive);
      await this.userRepository.save(user);
      return user;
    }
    throw new BadRequestException('wrong userId or role value');
  }
  async banUser(banDto: BanUserDto): Promise<BannedUsers> {
    // return await this.bannedUsersRep.create(banDto);
    const bannedUser = this.bannedUsersRep.create(banDto);
    return this.bannedUsersRep.save(bannedUser);
  }
}
