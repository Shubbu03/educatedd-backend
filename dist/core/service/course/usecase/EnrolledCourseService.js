"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseService = void 0;
const Enrolled_1 = require("@core/domain/course/entity/Enrolled");
const uuid_1 = require("uuid");
class EnrolledCourseService {
    constructor(enrolledCourseRepository) {
        this.enrolledCourseRepository = enrolledCourseRepository;
    }
    async execute(payload) {
        const enrolledCourse = await Enrolled_1.Enrolled.new({
            ownerId: (0, uuid_1.v4)(),
            courseID: payload.courseId,
            userID: payload.userId
        });
        console.log("NEWLY added course from EnrolledCourseService.ts is::", enrolledCourse);
        await this.enrolledCourseRepository.enrolledCourse(enrolledCourse);
        return true;
    }
}
exports.EnrolledCourseService = EnrolledCourseService;
//# sourceMappingURL=EnrolledCourseService.js.map