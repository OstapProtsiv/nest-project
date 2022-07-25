import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Roles } from '../models/roles.model';
// import { User } from '../models/user.model';
// import { UserRoles } from '../models/userRoles.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../entity/role.entity';
@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Roles]),
    // SequelizeModule.forFeature([Roles, User, UserRoles]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RolesModule {}
