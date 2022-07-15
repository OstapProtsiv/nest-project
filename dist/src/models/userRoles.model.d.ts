import { Model } from 'sequelize-typescript';
export declare class UserRoles extends Model<UserRoles> {
    id: number;
    user_id: number;
    role_id: number;
}
