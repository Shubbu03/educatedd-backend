import { MigrationInterface, QueryRunner } from "typeorm";

export class EnrolledCourseTable1696399095677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public."enrolled_course"
        ADD COLUMN "userID" UUID;
        `);

    await queryRunner.query(`
        ALTER TABLE public."enrolled_course"
        ADD CONSTRAINT fk_enrolled_course_user
        FOREIGN KEY ("userID")
        REFERENCES public."user"("id");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
