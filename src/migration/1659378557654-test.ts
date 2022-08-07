import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1659378557654 implements MigrationInterface {
  name = 'test1659378557654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "banned_users" ("id" SERIAL NOT NULL, "reason" character varying NOT NULL, "description" character varying NOT NULL, "test" character varying NOT NULL, "test2" integer NOT NULL, CONSTRAINT "PK_51d2f075cd1f44def51dba2a96a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bannedUserId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_6aae31235ef1dcc06b49d868ef" UNIQUE ("bannedUserId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL, "userIdId" integer, CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE ("title"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_users_user" ("rolesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d3cbca8230955a0710e11ba8175" PRIMARY KEY ("rolesId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fff143a2e106b54290cc9b5f84" ON "roles_users_user" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b864556d52a54cffe68b4c38d" ON "roles_users_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6aae31235ef1dcc06b49d868ef7" FOREIGN KEY ("bannedUserId") REFERENCES "banned_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_869a05340ed4bc3b904ed040206" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_users_user" ADD CONSTRAINT "FK_fff143a2e106b54290cc9b5f84c" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_users_user" ADD CONSTRAINT "FK_9b864556d52a54cffe68b4c38d0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_users_user" DROP CONSTRAINT "FK_9b864556d52a54cffe68b4c38d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_users_user" DROP CONSTRAINT "FK_fff143a2e106b54290cc9b5f84c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_869a05340ed4bc3b904ed040206"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6aae31235ef1dcc06b49d868ef7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9b864556d52a54cffe68b4c38d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fff143a2e106b54290cc9b5f84"`,
    );
    await queryRunner.query(`DROP TABLE "roles_users_user"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "banned_users"`);
  }
}
