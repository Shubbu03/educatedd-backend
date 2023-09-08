"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const ClassValidator_1 = require("@core/common/util/class-validator/ClassValidator");
class Entity {
    getId() {
        if (typeof this.id === 'undefined') {
            throw Exception_1.Exception.new({ code: Code_1.Code.ENTITY_VALIDATION_ERROR, overrideMessage: `${this.constructor.name}: ID is empty.` });
        }
        return this.id;
    }
    async validate() {
        const details = await ClassValidator_1.ClassValidator.validate(this);
        if (details) {
            throw Exception_1.Exception.new({ code: Code_1.Code.ENTITY_VALIDATION_ERROR, data: details });
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map