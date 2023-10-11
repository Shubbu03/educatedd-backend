"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseTable1697019323016 = void 0;
class CreateCourseTable1697019323016 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE public."course"
            DROP COLUMN IF EXISTS "chapter";
        `);
    }
    async down(queryRunner) { }
}
exports.CreateCourseTable1697019323016 = CreateCourseTable1697019323016;
//# sourceMappingURL=1697019323016-CreateCourseTable.js.map