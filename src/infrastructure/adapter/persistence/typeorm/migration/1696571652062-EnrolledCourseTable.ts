import {MigrationInterface, QueryRunner} from "typeorm";

export class EnrolledCourseTable1696571652062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE public."enrolled_course"
        ADD CONSTRAINT fk_enrolled_course_course
        FOREIGN KEY ("courseID")
        REFERENCES public."course"("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
