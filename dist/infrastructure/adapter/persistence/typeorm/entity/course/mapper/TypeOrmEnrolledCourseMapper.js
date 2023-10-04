"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmEnrolledCourseMapper = void 0;
const Enrolled_1 = require("@core/domain/course/entity/Enrolled");
const TypeOrmEnrolledCourse_1 = require("../TypeOrmEnrolledCourse");
class TypeOrmEnrolledCourseMapper {
    static toOrmEntity(domainEnrolled) {
        const ormEnrolled = new TypeOrmEnrolledCourse_1.TypeOrmEnrolledCourse();
        ormEnrolled.courseID = domainEnrolled.getCourseID();
        ormEnrolled.id = domainEnrolled.getOwnerId();
        return ormEnrolled;
    }
    static toOrmEntities(domainEnrolled) {
        return domainEnrolled.map((domainENCO) => this.toOrmEntity(domainENCO));
    }
    static toDomainEntity(ormCourse) {
        const domainCourse = new Enrolled_1.Enrolled({
            ownerId: ormCourse.id,
            courseID: ormCourse.courseID,
        });
        return domainCourse;
    }
    static toDomainEntities(ormCourses) {
        return ormCourses.map((ormCourse) => this.toDomainEntity(ormCourse));
    }
}
exports.TypeOrmEnrolledCourseMapper = TypeOrmEnrolledCourseMapper;
//# sourceMappingURL=TypeOrmEnrolledCourseMapper.js.map