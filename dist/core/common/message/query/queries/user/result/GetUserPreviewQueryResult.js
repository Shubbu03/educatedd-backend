"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPreviewQueryResult = void 0;
class GetUserPreviewQueryResult {
    constructor(id, name, role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
    static new(id, name, role) {
        return new GetUserPreviewQueryResult(id, name, role);
    }
}
exports.GetUserPreviewQueryResult = GetUserPreviewQueryResult;
//# sourceMappingURL=GetUserPreviewQueryResult.js.map