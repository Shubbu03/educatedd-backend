"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreApiResponse = void 0;
const Code_1 = require("@core/common/code/Code");
class CoreApiResponse {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data || null;
        this.timestamp = Date.now();
    }
    static success(data, message) {
        const resultCode = Code_1.Code.SUCCESS.code;
        const resultMessage = message || Code_1.Code.SUCCESS.message;
        return new CoreApiResponse(resultCode, resultMessage, data);
    }
    static error(code, message, data) {
        const resultCode = code || Code_1.Code.INTERNAL_ERROR.code;
        const resultMessage = message || Code_1.Code.INTERNAL_ERROR.message;
        return new CoreApiResponse(resultCode, resultMessage, data);
    }
}
exports.CoreApiResponse = CoreApiResponse;
//# sourceMappingURL=CoreApiResponse.js.map