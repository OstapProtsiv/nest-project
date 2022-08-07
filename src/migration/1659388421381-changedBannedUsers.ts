import { MigrationInterface, QueryRunner } from 'typeorm';

export class changedBannedUsers1659388421381 implements MigrationInterface {
  name = 'changedBannedUsers1659388421381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "banned_users" DROP COLUMN "test"`);
    await queryRunner.query(`ALTER TABLE "banned_users" DROP COLUMN "test2"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banned_users" ADD "test2" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banned_users" ADD "test" character varying NOT NULL`,
    );
  }
}
