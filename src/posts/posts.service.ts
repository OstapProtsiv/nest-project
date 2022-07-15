import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Posts } from '../models/post.model';
import { CreatePostDto } from './dtos/create-post.dto';

//get user id from token and rework to TYPEORM from sequelize

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private PostRepository: typeof Posts,
    private FileService: FilesService,
  ) {}

  async createPost(createDto: CreatePostDto, image) {
    const imageName = await this.FileService.createFile(image);
    console.log(createDto);

    const post = await this.PostRepository.create({
      ...createDto,
      image: imageName,
    });
    return post;
  }
}
