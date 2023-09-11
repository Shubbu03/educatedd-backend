"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCoursePreviewQueryResult = void 0;
class GetCoursePreviewQueryResult {
    constructor(id, type, relativePath) {
        this.id = id;
        this.type = type;
        this.relativePath = relativePath;
    }
    static new(id, type, relativePath) {
        return new GetCoursePreviewQueryResult(id, type, relativePath);
    }
}
exports.GetCoursePreviewQueryResult = GetCoursePreviewQueryResult;
//# sourceMappingURL=GetCoursePreviewQueryResult.js.map