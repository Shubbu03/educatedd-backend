"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseTable1697016550474 = void 0;
class CreateCourseTable1697016550474 {
    async up(queryRunner) {
        await queryRunner.query(`
    ALTER TABLE public."course"
    ADD COLUMN "chapter" INT;
    `);
    }
    async down(queryRunner) { }
}
exports.CreateCourseTable1697016550474 = CreateCourseTable1697016550474;
//# sourceMappingURL=1697016550474-CreateCourseTable.js.map