"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseTable1696399095677 = void 0;
class EnrolledCourseTable1696399095677 {
    async up(queryRunner) {
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
    async down(queryRunner) { }
}
exports.EnrolledCourseTable1696399095677 = EnrolledCourseTable1696399095677;
//# sourceMappingURL=1696399095677-EnrolledCourseTable.js.map