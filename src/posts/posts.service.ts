import { Injectable } from '@nestjs/common';
import { Posts } from '../entity/post.entity';
import { FilesService } from '../files/files.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
//get user id from token and rework to TYPEORM from sequelize

@Injectable()
export class PostsService {
  constructor(
    // @InjectRepo(Posts) private PostRepository: Posts,
    @InjectRepository(Posts) private PostRepository: Repository<Posts>,
    private FileService: FilesService, // @InjectRepository()
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async createPost(createDto: CreatePostDto, image): Promise<Posts> {
    const imageName = await this.FileService.createFile(image);
    const post = this.PostRepository.create({
      ...createDto,
      image: imageName,
    });

    return this.PostRepository.save(post);
  }
}
