"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseTable1694427272887 = void 0;
class CreateCourseTable1694427272887 {
    async up(queryRunner) {
        await queryRunner.query(`
       CREATE TYPE COURSE_TYPE_ENUM AS ENUM('PDF')
       `);
        await queryRunner.query(`
       CREATE TABLE public."course"(
        "id"            UUID NULL,
        "ownerId"       UUID NULL,
        "courseId"      UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
        "title"         VARCHAR(100) NULL,
        "description"   VARCHAR(200) NULL,
        "pdfDetails"    VARCHAR(200) NULL,
        "keywords"      VARCHAR(200) NULL,
        "type"          COURSE_TYPE_ENUM NULL,
        "relativePath"  VARCHAR(200) NULL,
        "size"          INT NULL,
        "ext"           VARCHAR(10) NULL,
        "mimetype"      VARCHAR(100) NULL,
        "createdAt"     TIMESTAMP WITH TIME ZONE NULL,
        "editedAt"      TIMESTAMP WITH TIME ZONE NULL,
        "removedAt"     TIMESTAMP WITH TIME ZONE NULL
         );
       `);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE public."course";');
        await queryRunner.query('DROP TYPE COURSE_TYPE_ENUM;');
    }
}
exports.CreateCourseTable1694427272887 = CreateCourseTable1694427272887;
//# sourceMappingURL=1694427272887-CreateCourseTable.js.map