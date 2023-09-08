"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaTable1594769206476 = void 0;
class CreateMediaTable1594769206476 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TYPE MEDIA_TYPE_ENUM as ENUM ('IMAGE');
    `);
        await queryRunner.query(`
      CREATE TABLE public."media"(
        "id"           UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
        "ownerId"      UUID NULL,
        "name"         VARCHAR(100) NULL,
        "type"         MEDIA_TYPE_ENUM NULL,
        "relativePath" VARCHAR(200) NULL,
        "size"         INT NULL,
        "ext"          VARCHAR(10) NULL,
        "mimetype"     VARCHAR(100) NULL,
        "createdAt"    TIMESTAMP WITH TIME ZONE NULL,
        "editedAt"     TIMESTAMP WITH TIME ZONE NULL,
        "removedAt"    TIMESTAMP WITH TIME ZONE NULL
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE public."media";');
        await queryRunner.query('DROP TYPE MEDIA_TYPE_ENUM;');
    }
}
exports.CreateMediaTable1594769206476 = CreateMediaTable1594769206476;
//# sourceMappingURL=1594769206476-CreateMediaTable.js.map