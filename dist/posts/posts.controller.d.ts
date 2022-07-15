import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { Posts } from 'src/models/post.model';
export declare class PostsController {
    private PostService;
    constructor(PostService: PostsService);
    createPost(createPostDto: CreatePostDto, image: any): Promise<Posts>;
}
