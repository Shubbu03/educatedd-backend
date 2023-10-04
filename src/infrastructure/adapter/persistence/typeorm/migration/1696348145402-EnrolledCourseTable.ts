import {MigrationInterface, QueryRunner} from "typeorm";

export class EnrolledCourseTable1696348145402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE public."enrolled_course"(
         "courseID"       UUID NULL,
         
         "id"            UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
        
         "createdAt"     TIMESTAMP WITH TIME ZONE NULL,
         "editedAt"      TIMESTAMP WITH TIME ZONE NULL,
         "removedAt"     TIMESTAMP WITH TIME ZONE NULL
          );
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE public."enrolled_course";');
    }

}
