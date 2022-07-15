import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post', type: String })
  @IsString({ message: 'must be a string' })
  readonly title: string;
  @ApiProperty({ description: 'Content of the post', type: String })
  @IsString({ message: 'must be a string' })
  readonly content: string;
  @ApiProperty({ description: 'Authors id', type: String })
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: number;
}
