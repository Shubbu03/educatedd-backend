"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompleteChapterListService = void 0;
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
class GetCompleteChapterListService {
    constructor(enrolledCourseListRepository) {
        this.enrolledCourseListRepository = enrolledCourseListRepository;
    }
    async execute(payload) {
        const courses = await this.enrolledCourseListRepository.findCompleteChapter();
        return CourseUseCaseDto_1.CourseUseCaseDto.newCompleteChapterList(courses);
    }
}
exports.GetCompleteChapterListService = GetCompleteChapterListService;
//# sourceMappingURL=GetCompleteChapterListService.js.map