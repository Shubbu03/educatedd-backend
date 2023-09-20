"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseService = void 0;
const Course_1 = require("@core/domain/course/entity/Course");
const CourseUseCaseDto_1 = require("@core/domain/course/usecase/dto/CourseUseCaseDto");
class CreateCourseService {
    constructor(courseRepository, courseFileStorage) {
        this.courseRepository = courseRepository;
        this.courseFileStorage = courseFileStorage;
    }
    async execute(payload) {
        const fileMetaData = await this.courseFileStorage.upload(payload.file, { type: payload.type });
        const course = await Course_1.Course.new({
            ownerId: payload.executorId,
            courseId: payload.executorId,
            title: payload.name,
            description: payload.name,
            pdfDetails: payload.name,
            keywords: [payload.name],
            type: payload.type,
            metadata: fileMetaData,
        });
        await this.courseRepository.addCourse(course);
        return CourseUseCaseDto_1.CourseUseCaseDto.newFromCourse(course);
    }
}
exports.CreateCourseService = CreateCourseService;
//# sourceMappingURL=CreateCourseService.js.map