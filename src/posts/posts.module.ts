import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entity/post.entity';
import { User } from '../entity/user.entity';
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    // SequelizeModule.forFeature([User, Posts]),
    TypeOrmModule.forFeature([User, Posts]),
    FilesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostsModule {}
