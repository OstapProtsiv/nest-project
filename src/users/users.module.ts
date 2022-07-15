import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { BannedUsers } from '../models/banned.users.model';
import { Roles } from '../models/roles.model';
import { User } from '../models/user.model';
import { UserRoles } from '../models/userRoles.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Roles, UserRoles, BannedUsers]),
    JwtModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
