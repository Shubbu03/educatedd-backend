"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseTable1696571652062 = void 0;
class EnrolledCourseTable1696571652062 {
    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE public."enrolled_course"
        ADD CONSTRAINT fk_enrolled_course_course
        FOREIGN KEY ("courseID")
        REFERENCES public."course"("id");
        `);
    }
    async down(queryRunner) {
    }
}
exports.EnrolledCourseTable1696571652062 = EnrolledCourseTable1696571652062;
//# sourceMappingURL=1696571652062-EnrolledCourseTable.js.map