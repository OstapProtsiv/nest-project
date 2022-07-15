import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { BannedUsers } from './banned.users.model';
import { Posts } from './post.model';
import { Roles } from './roles.model';
import { UserRoles } from './userRoles.model';

interface CreateUserAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, CreateUserAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'testEmail@gmail.com' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];

  @HasMany(() => Posts)
  posts: Posts[];
}

//create separate table with banned users
