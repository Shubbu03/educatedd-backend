"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleDoesCourseExistQueryService = void 0;
const DoesCourseExistQueryResult_1 = require("@core/common/message/query/queries/course/result/DoesCourseExistQueryResult");
class HandleDoesCourseExistQueryService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        const count = await this.mediaRepository.countCourses(query.by);
        return DoesCourseExistQueryResult_1.DoesCourseExistQueryResult.new(!!count);
    }
}
exports.HandleDoesCourseExistQueryService = HandleDoesCourseExistQueryService;
//# sourceMappingURL=HandleDoesCourseExistQueryService.js.map