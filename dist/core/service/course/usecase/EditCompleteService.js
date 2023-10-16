"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCompleteService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
class EditCompleteService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async execute(payload) {
        const enroll = CoreAssert_1.CoreAssert.notEmpty(await this.courseRepository.findCompleteCourse({
            courseID: payload.courseId,
            id: payload.executorId,
            completedchapter: payload.chapterCompleted,
        }), Exception_1.Exception.new({
            code: Code_1.Code.ENTITY_NOT_FOUND_ERROR,
            overrideMessage: "Course not found.",
        }));
        await enroll.edit_complete({
            courseID: payload.courseId,
            chapterCompleted: payload.chapterCompleted,
            id: payload.executorId,
        });
        console.log("BEFORE THE UPDATE COMPLETE IN EDIT COMPLETE SERVICE", enroll);
        await this.courseRepository.update_complete(enroll);
        console.log("AFTER THE UPDATE COMPLETE IN EDIT COMPLETE SERVICE", enroll);
        return CourseUseCaseDto_1.CourseUseCaseDto.newFromCompleteCourse(enroll);
    }
}
exports.EditCompleteService = EditCompleteService;
//# sourceMappingURL=EditCompleteService.js.map