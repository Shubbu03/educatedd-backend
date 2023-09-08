"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const ClassValidator_1 = require("@core/common/util/class-validator/ClassValidator");
class ValueObject {
    async validate() {
        const details = await ClassValidator_1.ClassValidator.validate(this);
        if (details) {
            throw Exception_1.Exception.new({ code: Code_1.Code.VALUE_OBJECT_VALIDATION_ERROR, data: details });
        }
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map