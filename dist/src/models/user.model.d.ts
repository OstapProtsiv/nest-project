import { Model } from 'sequelize-typescript';
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
}
export {};
