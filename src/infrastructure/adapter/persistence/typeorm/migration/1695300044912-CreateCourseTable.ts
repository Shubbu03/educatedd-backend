import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1695300044912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE TYPE COURSE_TYPE_ENUM_LAT AS ENUM('PDF')
        `);

    await queryRunner.query(`
            ALTER TABLE public."course"
            DROP COLUMN IF EXISTS "courseId";
        `);

    await queryRunner.query(`
    ALTER TABLE public."course"
    ADD COLUMN "id" UUID PRIMARY KEY DEFAULT uuid_generate_v1mc();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public."course";');
    await queryRunner.query("DROP TYPE COURSE_TYPE_ENUM;");
  }
}
