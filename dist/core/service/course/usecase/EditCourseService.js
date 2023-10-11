"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCourseService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
class EditCourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async execute(payload) {
        const course = CoreAssert_1.CoreAssert.notEmpty(await this.courseRepository.findCourse({ id: payload.id }), Exception_1.Exception.new({
            code: Code_1.Code.ENTITY_NOT_FOUND_ERROR,
            overrideMessage: "Course not found.",
        }));
        const hasAccess = payload.executorId === course.getOwnerId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        await course.edit({
            title: payload.title,
            description: payload.description,
            chapter: payload.chapter
        });
        await this.courseRepository.updateCourse(course);
        return CourseUseCaseDto_1.CourseUseCaseDto.newFromCourse(course);
    }
}
exports.EditCourseService = EditCourseService;
//# sourceMappingURL=EditCourseService.js.map