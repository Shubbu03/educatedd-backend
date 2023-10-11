import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1697016550474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE public."course"
    ADD COLUMN "chapter" INT;
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
