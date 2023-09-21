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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRestApiModelCourse = void 0;
const CourseEnums_1 = require("@core/common/enums/CourseEnums");
const swagger_1 = require("@nestjs/swagger");
class HttpRestApiModelCourse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelCourse.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelCourse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelCourse.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelCourse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelCourse.prototype, "pdfDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", Array)
], HttpRestApiModelCourse.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: CourseEnums_1.CourseType }),
    __metadata("design:type", String)
], HttpRestApiModelCourse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    __metadata("design:type", Number)
], HttpRestApiModelCourse.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    __metadata("design:type", Number)
], HttpRestApiModelCourse.prototype, "editedAt", void 0);
exports.HttpRestApiModelCourse = HttpRestApiModelCourse;
//# sourceMappingURL=HttpRestApiModelCourse.js.map