import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'email of user', type: String })
  @IsEmail({}, { message: 'Wrong email' })
  readonly email: string;
  @ApiProperty({ description: 'password of user', type: String })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, {
    message: 'must be contain more than 4 and less than 16 symbols',
  })
  readonly password: string;
}
