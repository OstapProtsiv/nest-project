import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { BannedUsers } from '../entity/banned.users.entiy';
import { Posts } from '../entity/post.entity';
import { Roles } from '../entity/role.entity';
import { User } from '../entity/user.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DBNAME,
    synchronize: true,
    autoLoadEntities: true,
    entities: [User, BannedUsers, Roles, Posts],
    migrations: [__dirname + '/../migration/*{.ts,.js}'],
  }),
};

export const typeOrmConfigMigrations: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DBNAME,
  //   autoLoadEntities: true,
  entities: [User, BannedUsers, Roles, Posts],
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
};
