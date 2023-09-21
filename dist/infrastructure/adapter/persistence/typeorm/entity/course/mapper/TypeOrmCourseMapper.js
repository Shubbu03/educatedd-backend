"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmCourseMapper = void 0;
const Course_1 = require("@core/domain/course/entity/Course");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const TypeOrmCourse_1 = require("@infrastructure/adapter/persistence/typeorm/entity/course/TypeOrmCourse");
class TypeOrmCourseMapper {
    static toOrmEntity(domainCourse) {
        const ormCourse = new TypeOrmCourse_1.TypeOrmCourse();
        ormCourse.courseId = domainCourse.getId();
        ormCourse.ownerId = domainCourse.getOwnerId();
        ormCourse.title = domainCourse.getTitle();
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
            relativePath: ormCourse.relativePath,
            size: ormCourse.size,
            ext: ormCourse.ext,
            mimetype: ormCourse.mimetype,
        });
        const domainCourse = new Course_1.Course({
            ownerId: ormCourse.ownerId,
            courseId: ormCourse.courseId,
            title: ormCourse.title,
            description: ormCourse.description,
            pdfDetails: ormCourse.pdfDetails,
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
exports.TypeOrmCourseMapper = TypeOrmCourseMapper;
//# sourceMappingURL=TypeOrmCourseMapper.js.map