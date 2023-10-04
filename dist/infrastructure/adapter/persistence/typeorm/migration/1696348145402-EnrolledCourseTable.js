"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseTable1696348145402 = void 0;
class EnrolledCourseTable1696348145402 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE public."enrolled_course";');
    }
}
exports.EnrolledCourseTable1696348145402 = EnrolledCourseTable1696348145402;
//# sourceMappingURL=1696348145402-EnrolledCourseTable.js.map