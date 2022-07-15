import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { UserRoles } from './userRoles.model';

interface RolesCreationAttr {
  value: string;
  description: string;
}
@Table({ tableName: 'roles' })
export class Roles extends Model<Roles, RolesCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique identificator' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    default: 'USER',
    description: 'Unique value of role',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description of the role',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
