import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Posts } from '../models/post.model';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private PostService: PostsService) {}
  @ApiOperation({ summary: 'create a post' })
  @ApiResponse({ status: 201, type: Posts })
  @ApiBody({ type: CreatePostDto })
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image,
  ) {
    return this.PostService.createPost(createPostDto, image);
  }
}
