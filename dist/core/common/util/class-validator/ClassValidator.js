"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidator = void 0;
const class_validator_1 = require("class-validator");
class ClassValidator {
    static async validate(target, context) {
        let details;
        const errors = await (0, class_validator_1.validate)(target);
        if (errors.length > 0) {
            details = {
                context: context || target.constructor.name,
                errors: []
            };
            for (const error of errors) {
                details.errors.push({
                    property: error.property,
                    message: error.constraints ? Object.values(error.constraints) : []
                });
            }
        }
        return details;
    }
}
exports.ClassValidator = ClassValidator;
//# sourceMappingURL=ClassValidator.js.map