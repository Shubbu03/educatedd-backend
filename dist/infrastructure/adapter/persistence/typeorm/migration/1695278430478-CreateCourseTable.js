"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseTable1695278430478 = void 0;
class CreateCourseTable1695278430478 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TYPE COURSE_TYPE_ENUM_NEW AS ENUM('PDF')
        `);
        await queryRunner.query(`
        CREATE TABLE public."course_new"(
         "ownerId"       UUID NULL,
         "courseId"      UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
         "title"         VARCHAR(100) NULL,
         "description"   VARCHAR(200) NULL,
         "pdfDetails"    VARCHAR(200) NULL,
         "keywords"      VARCHAR(200) NULL,
         "type"          COURSE_TYPE_ENUM_NEW NULL,
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
exports.CreateCourseTable1695278430478 = CreateCourseTable1695278430478;
//# sourceMappingURL=1695278430478-CreateCourseTable.js.map