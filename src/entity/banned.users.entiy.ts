import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BannedUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  reason: string;

  @Column({ nullable: false })
  description: string;
}
