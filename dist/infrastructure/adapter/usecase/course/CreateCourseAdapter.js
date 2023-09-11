"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateCourseAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseAdapter = void 0;
const UseCaseValidatableAdapter_1 = require("@core/common/adapter/usecase/UseCaseValidatableAdapter");
const CourseEnums_1 = require("@core/common/enums/CourseEnums");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CreateCourseAdapter = CreateCourseAdapter_1 = class CreateCourseAdapter extends UseCaseValidatableAdapter_1.UseCaseValidatableAdapter {
    static async new(payload) {
        const adapter = (0, class_transformer_1.plainToClass)(CreateCourseAdapter_1, payload);
        await adapter.validate();
        return adapter;
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCourseAdapter.prototype, "executorId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCourseAdapter.prototype, "courseId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseAdapter.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(CourseEnums_1.CourseType),
    __metadata("design:type", String)
], CreateCourseAdapter.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Object)
], CreateCourseAdapter.prototype, "file", void 0);
CreateCourseAdapter = CreateCourseAdapter_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], CreateCourseAdapter);
exports.CreateCourseAdapter = CreateCourseAdapter;
//# sourceMappingURL=CreateCourseAdapter.js.map