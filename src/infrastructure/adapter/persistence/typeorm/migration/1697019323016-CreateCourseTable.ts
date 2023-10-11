import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1697019323016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
            ALTER TABLE public."course"
            DROP COLUMN IF EXISTS "chapter";
        `);

    // await queryRunner.query(`
    // ALTER TABLE public."course"
    // MODIFY chapter VARCHAR(100);
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
