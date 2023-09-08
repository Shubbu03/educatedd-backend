"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseValidatableAdapter = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const ClassValidator_1 = require("@core/common/util/class-validator/ClassValidator");
class UseCaseValidatableAdapter {
    async validate() {
        const details = await ClassValidator_1.ClassValidator.validate(this);
        if (details) {
            throw Exception_1.Exception.new({ code: Code_1.Code.USE_CASE_PORT_VALIDATION_ERROR, data: details });
        }
    }
}
exports.UseCaseValidatableAdapter = UseCaseValidatableAdapter;
//# sourceMappingURL=UseCaseValidatableAdapter.js.map