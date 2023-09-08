"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostTable1594770165389 = void 0;
class CreatePostTable1594770165389 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE POST_STATUS_ENUM as ENUM ('DRAFT', 'PUBLISHED');
    `);
        await queryRunner.query(`
      CREATE TABLE public."post"(
        "id"          UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
        "ownerId"     UUID NULL,
        "title"       VARCHAR(100) NULL,
        "imageId"     UUID NULL,
        "content"     VARCHAR(10000) NULL,
        "status"      POST_STATUS_ENUM NULL,
        "createdAt"   TIMESTAMP WITH TIME ZONE NULL,
        "editedAt"    TIMESTAMP WITH TIME ZONE NULL,
        "publishedAt" TIMESTAMP WITH TIME ZONE NULL,
        "removedAt"   TIMESTAMP WITH TIME ZONE NULL
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE public."post";');
        await queryRunner.query('DROP TYPE POST_STATUS_ENUM;');
    }
}
exports.CreatePostTable1594770165389 = CreatePostTable1594770165389;
//# sourceMappingURL=1594770165389-CreatePostTable.js.map