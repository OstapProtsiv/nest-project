import { Model } from 'sequelize-typescript';
import { User } from './user.model';
interface CreatePostAttr {
    title: string;
    content: string;
    userId: number;
    image?: string;
}
export declare class Posts extends Model<Posts, CreatePostAttr> {
    id: number;
    title: string;
    content: string;
    image: string;
    userId: number;
    author: User;
}
export {};
