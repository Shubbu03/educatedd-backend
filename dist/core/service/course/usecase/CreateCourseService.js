"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseService = void 0;
const Course_1 = require("@core/domain/course/entity/Course");
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
const uuid_1 = require("uuid");
class CreateCourseService {
    constructor(courseRepository, courseFileStorage) {
        this.courseRepository = courseRepository;
        this.courseFileStorage = courseFileStorage;
    }
    async execute(payload) {
        const course = await Course_1.Course.new({
            ownerId: payload.executorId,
            id: (0, uuid_1.v4)(),
            title: payload.title,
            description: payload.description,
            pdfDetails: payload.pdfDetails,
            chapter: payload.chapter
        });
        console.log("NEWLY added course from CreateCourseService.ts is::", course);
        await this.courseRepository.addCourse(course);
        return CourseUseCaseDto_1.CourseUseCaseDto.newFromCourse(course);
    }
}
exports.CreateCourseService = CreateCourseService;
//# sourceMappingURL=CreateCourseService.js.map