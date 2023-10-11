import { MigrationInterface, QueryRunner } from "typeorm";

export class EnrolledCoursetable1697030361699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public."enrolled_course"
        ADD COLUMN completedChapter VARCHAR(100);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
