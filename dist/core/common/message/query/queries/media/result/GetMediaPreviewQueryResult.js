"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaPreviewQueryResult = void 0;
class GetMediaPreviewQueryResult {
    constructor(id, type, relativePath) {
        this.id = id;
        this.type = type;
        this.relativePath = relativePath;
    }
    static new(id, type, relativePath) {
        return new GetMediaPreviewQueryResult(id, type, relativePath);
    }
}
exports.GetMediaPreviewQueryResult = GetMediaPreviewQueryResult;
//# sourceMappingURL=GetMediaPreviewQueryResult.js.map