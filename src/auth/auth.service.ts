import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UsersService: UsersService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.createToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate: User = await this.UsersService.findUserByEmail(
      userDto.email,
    );
    if (candidate) {
      throw new HttpException(
        'person with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 4);
    const createdUser = await this.UsersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.createToken(createdUser);
  }

  private createToken(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      roles: user.roles,
      id: user.id,
    });
  }
  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user: User = await this.UsersService.findUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isEqualsPasswords = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isEqualsPasswords) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
