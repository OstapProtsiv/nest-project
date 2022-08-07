import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BannedUsers {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'testEmail@gmail.com' })
  @Column({ nullable: false })
  reason: string;

  @ApiProperty({ example: 'password' })
  @Column({ nullable: false })
  description: string;
}
