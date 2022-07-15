import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createRoleDto {
  @ApiProperty({ description: 'value of the role', type: String })
  @IsString()
  readonly value: string;

  @ApiProperty({ description: 'description of the role', type: String })
  @IsString()
  readonly description: string;
}
