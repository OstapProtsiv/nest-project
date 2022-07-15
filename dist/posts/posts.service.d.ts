import { CreatePostDto } from './dtos/create-post.dto';
import { Posts } from 'src/models/post.model';
import { FilesService } from 'src/files/files.service';
export declare class PostsService {
    private PostRepository;
    private FileService;
    constructor(PostRepository: typeof Posts, FileService: FilesService);
    createPost(createDto: CreatePostDto, image: any): Promise<Posts>;
}
