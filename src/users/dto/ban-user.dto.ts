import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: 1, type: Number })
  readonly userId: number;
  @ApiProperty({ example: 'reason to ban', type: String })
  readonly reason: string;
  @ApiProperty({ example: 'description of ban', type: String })
  readonly description: string;
}
