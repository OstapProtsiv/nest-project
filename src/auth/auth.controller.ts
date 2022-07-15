import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../models/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @ApiOperation({ summary: 'Registrate' })
  @ApiResponse({ status: 201, type: User })
  @Post('registration')
  async registration(@Body() userDto: CreateUserDto): Promise<string> {
    return this.AuthService.registration(userDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, type: String })
  @Post('login')
  async login(@Body() userDto: CreateUserDto): Promise<string> {
    return this.AuthService.login(userDto);
  }
}
