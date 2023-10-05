"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCourseListService = void 0;
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
class GetCourseListService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async execute(payload) {
        const courses = await this.courseRepository.findCourses();
        return CourseUseCaseDto_1.CourseUseCaseDto.newListFromCourses(courses);
    }
}
exports.GetCourseListService = GetCourseListService;
//# sourceMappingURL=GetCourseListService.js.map