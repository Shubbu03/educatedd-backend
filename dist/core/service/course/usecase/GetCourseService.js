"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCourseService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
class GetCourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async execute(payload) {
        const media = CoreAssert_1.CoreAssert.notEmpty(await this.courseRepository.findCourse({ id: payload.courseId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Course not found.' }));
        const hasAccess = payload.executorId === media.getOwnerId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        return CourseUseCaseDto_1.CourseUseCaseDto.newFromCourse(media);
    }
}
exports.GetCourseService = GetCourseService;
//# sourceMappingURL=GetCourseService.js.map