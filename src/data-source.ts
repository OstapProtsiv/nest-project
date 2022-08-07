import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BannedUsers } from './entity/banned.users.entiy';
import { Posts } from './entity/post.entity';
import { Roles } from './entity/role.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nest-project-migrations',
  synchronize: false,
  logging: false,
  // entities: [__dirname + '/entity/*.{ts}'],
  // entities: [BannedUsers, Posts, Roles],
  entities: ['build/entity/**/*{.ts,.js}'],
  migrations: ['build/migration/**/*{.ts,.js}'],
  // migrations: [__dirname + '/migration/*.{ts}'],
  migrationsTableName: 'migrationtablename',
  subscribers: [],
});
