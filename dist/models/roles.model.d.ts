import { Model } from 'sequelize-typescript';
import { User } from './user.model';
interface RolesCreationAttr {
    value: string;
    description: string;
}
export declare class Roles extends Model<Roles, RolesCreationAttr> {
    id: number;
    value: string;
    description: string;
    users: User[];
}
export {};
