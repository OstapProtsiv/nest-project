import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

interface banUserAttr {
  userId: number;
  reason: string;
}

@Table({ tableName: 'banned_users' })
export class BannedUsers extends Model<BannedUsers, banUserAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  reason: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
