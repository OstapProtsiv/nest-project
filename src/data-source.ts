import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nest-project-migrations',
  synchronize: true,
  logging: false,
  entities: ['**/**/*.entity.js'],
  migrations: ['**/**/migrations/*.js'],
  subscribers: [],
});
