import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BanUserDto } from '../../dist/users/dto/ban-user.dto';
import { RolesDec } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UsePipes(ValidationPipe)
@RolesDec(['ADMIN'])
@UseGuards(RolesGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @ApiOperation({ summary: 'Get all users from the db' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    return this.UserService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return this.UserService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Give role' })
  @ApiResponse({ status: 201 })
  @Post('giveRole')
  async giveRole(@Body() giveDto: GiveRoleDto) {
    return this.UserService.giveRole(giveDto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 201 })
  @Post('ban')
  async banUser(@Body() banUserDto: BanUserDto) {
    return this.UserService.banUser(banUserDto);
  }
}
