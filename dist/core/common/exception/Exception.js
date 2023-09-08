"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(codeDescription, overrideMessage, data) {
        super();
        this.name = this.constructor.name;
        this.code = codeDescription.code;
        this.data = data;
        this.message = overrideMessage || codeDescription.message;
        Error.captureStackTrace(this, this.constructor);
    }
    static new(payload) {
        return new Exception(payload.code, payload.overrideMessage, payload.data);
    }
}
exports.Exception = Exception;
//# sourceMappingURL=Exception.js.map