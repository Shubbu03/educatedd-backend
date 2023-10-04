"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1696415826353 = void 0;
class CreateUserTable1696415826353 {
    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TYPE USER_ROLE_ENUM
        ADD VALUE 'STUDENT';

        `);
    }
    async down(queryRunner) { }
}
exports.CreateUserTable1696415826353 = CreateUserTable1696415826353;
//# sourceMappingURL=1696415826353-CreateUserTable.js.map