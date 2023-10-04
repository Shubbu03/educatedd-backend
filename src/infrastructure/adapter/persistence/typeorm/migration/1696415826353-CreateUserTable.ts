import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1696415826353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TYPE USER_ROLE_ENUM
        ADD VALUE 'STUDENT';

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
