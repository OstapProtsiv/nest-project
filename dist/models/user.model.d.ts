import { Model } from 'sequelize-typescript';
import { Posts } from './post.model';
import { Roles } from './roles.model';
interface CreateUserAttr {
    email: string;
    password: string;
}
export declare class User extends Model<User, CreateUserAttr> {
    id: number;
    email: string;
    password: string;
    roles: Roles[];
    posts: Posts[];
}
export {};
