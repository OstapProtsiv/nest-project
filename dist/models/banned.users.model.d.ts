import { Model } from 'sequelize-typescript';
interface banUserAttr {
    userId: number;
    reason: string;
}
export declare class BannedUsers extends Model<BannedUsers, banUserAttr> {
    id: number;
    reason: string;
    userId: number;
}
export {};
