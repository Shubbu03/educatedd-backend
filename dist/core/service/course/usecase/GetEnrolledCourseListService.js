"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEnrolledCourseListService = void 0;
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
const Code_1 = require("@core/common/code/Code");
class GetEnrolledCourseListService {
    constructor(enrolledCourseListRepository) {
        this.enrolledCourseListRepository = enrolledCourseListRepository;
    }
    async execute(payload) {
        const enrolledInCourse = CoreAssert_1.CoreAssert.notEmpty(await this.enrolledCourseListRepository.findEnrolledCourses({
            userID: payload.executorId,
        }), Exception_1.Exception.new({
            code: Code_1.Code.ENTITY_NOT_FOUND_ERROR,
            overrideMessage: "Course not found.",
        }));
        console.log("ENTERED THE GetEnrolledCourseListService!!!!");
        return CourseUseCaseDto_1.CourseUseCaseDto.newEnrolledCourseListFromCourses(enrolledInCourse);
    }
}
exports.GetEnrolledCourseListService = GetEnrolledCourseListService;
//# sourceMappingURL=GetEnrolledCourseListService.js.map