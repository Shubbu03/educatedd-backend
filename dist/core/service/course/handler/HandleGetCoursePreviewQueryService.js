"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleGetCoursePreviewQueryService = void 0;
const GetCoursePreviewQueryResult_1 = require("@core/common/message/query/queries/course/result/GetCoursePreviewQueryResult");
class HandleGetCoursePreviewQueryService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async handle(query) {
        let queryResult;
        const course = await this.courseRepository.findCourse(query.by);
        if (course) {
            queryResult = GetCoursePreviewQueryResult_1.GetCoursePreviewQueryResult.new(course.getId());
        }
        return queryResult;
    }
}
exports.HandleGetCoursePreviewQueryService = HandleGetCoursePreviewQueryService;
//# sourceMappingURL=HandleGetCoursePreviewQueryService.js.map