"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmFileMapper = void 0;
const UploadFile_1 = require("@core/domain/course/entity/UploadFile");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const TypeOrmFile_1 = require("../TypeOrmFile");
class TypeOrmFileMapper {
    static toOrmEntity(domainCourse) {
        const ormCourse = new TypeOrmFile_1.TypeOrmFile();
        ormCourse.pdfDetails = domainCourse.getMetadata().relativePath;
        ormCourse.createdAt = domainCourse.getCreatedAt();
        ormCourse.editedAt = domainCourse.getEditedAt();
        ormCourse.removedAt = domainCourse.getRemovedAt();
        return ormCourse;
    }
    static toOrmEntities(domainCourses) {
        return domainCourses.map(domainCourse => this.toOrmEntity(domainCourse));
    }
    static toDomainEntity(ormCourse) {
        const metadata = new FileMetadata_1.FileMetadata({
            relativePath: ormCourse.pdfDetails,
        });
        const domainCourse = new UploadFile_1.UploadFile({
            metadata: metadata,
            createdAt: ormCourse.createdAt,
            editedAt: ormCourse.editedAt,
            removedAt: ormCourse.removedAt,
        });
        return domainCourse;
    }
    static toDomainEntities(ormCourses) {
        return ormCourses.map(ormCourse => this.toDomainEntity(ormCourse));
    }
}
exports.TypeOrmFileMapper = TypeOrmFileMapper;
//# sourceMappingURL=TypeOrmFileMapper.js.map