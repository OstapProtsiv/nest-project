import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GiveRoleDto {
  @ApiProperty({ description: 'Users id', type: Number })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
  @ApiProperty({ description: 'Roles name', type: String })
  @IsString({ message: 'Must be a string' })
  readonly role: string;
}
