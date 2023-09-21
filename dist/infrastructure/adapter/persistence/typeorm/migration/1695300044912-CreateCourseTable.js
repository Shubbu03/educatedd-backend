"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseTable1695300044912 = void 0;
class CreateCourseTable1695300044912 {
    async up(queryRunner) {
        await queryRunner.query(`
           CREATE TYPE COURSE_TYPE_ENUM_LAT AS ENUM('PDF')
        `);
        await queryRunner.query(`
            ALTER TABLE public."course"
            DROP COLUMN IF EXISTS "courseId";
        `);
        await queryRunner.query(`
    ALTER TABLE public."course"
    ADD COLUMN "id" UUID PRIMARY KEY DEFAULT uuid_generate_v1mc();
    `);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE public."course";');
        await queryRunner.query("DROP TYPE COURSE_TYPE_ENUM;");
    }
}
exports.CreateCourseTable1695300044912 = CreateCourseTable1695300044912;
//# sourceMappingURL=1695300044912-CreateCourseTable.js.map