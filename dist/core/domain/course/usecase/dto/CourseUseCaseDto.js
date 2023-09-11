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
var CourseUseCaseDto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseUseCaseDto = void 0;
const CourseEnums_1 = require("@core/common/enums/CourseEnums");
const class_transformer_1 = require("class-transformer");
let CourseUseCaseDto = CourseUseCaseDto_1 = class CourseUseCaseDto {
    static newFromCourse(course) {
        const dto = (0, class_transformer_1.plainToClass)(CourseUseCaseDto_1, course);
        dto.url = course.getMetadata().relativePath;
        dto.createdAt = course.getCreatedAt().getTime();
        dto.editedAt = course.getEditedAt()?.getTime() || null;
        return dto;
    }
    static newListFromCourses(courses) {
        return courses.map(courses => this.newFromCourse(courses));
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "courseId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "pdfDetails", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CourseUseCaseDto.prototype, "keywords", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CourseUseCaseDto.prototype, "type", void 0);
CourseUseCaseDto = CourseUseCaseDto_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], CourseUseCaseDto);
exports.CourseUseCaseDto = CourseUseCaseDto;
//# sourceMappingURL=CourseUseCaseDto.js.map