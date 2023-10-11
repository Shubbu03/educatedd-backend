"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCoursetable1697019890477 = void 0;
class CreateCoursetable1697019890477 {
    async up(queryRunner) {
        await queryRunner.query(`
    ALTER TABLE public."course"
    ADD COLUMN chapter VARCHAR(100);
    `);
    }
    async down(queryRunner) { }
}
exports.CreateCoursetable1697019890477 = CreateCoursetable1697019890477;
//# sourceMappingURL=1697019890477-CreateCoursetable.js.map