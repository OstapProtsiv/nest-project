import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { BannedUsers } from './banned.users.entiy';
import { Posts } from './post.entity';
import { Roles } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => BannedUsers)
  @JoinColumn()
  bannedUser: BannedUsers;

  @ManyToMany(() => Roles, (roles) => roles.users)
  roles: Roles[];

  @OneToMany(() => Posts, (Posts) => Posts.userId)
  posts: Posts[];
}
