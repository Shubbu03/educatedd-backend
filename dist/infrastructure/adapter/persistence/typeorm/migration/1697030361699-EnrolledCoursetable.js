"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCoursetable1697030361699 = void 0;
class EnrolledCoursetable1697030361699 {
    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE public."enrolled_course"
        ADD COLUMN completedChapter VARCHAR(100);
        `);
    }
    async down(queryRunner) { }
}
exports.EnrolledCoursetable1697030361699 = EnrolledCoursetable1697030361699;
//# sourceMappingURL=1697030361699-EnrolledCoursetable.js.map