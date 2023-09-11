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
exports.Course = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const CourseEnums_1 = require("@core/common/enums/CourseEnums");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class Course extends Entity_1.Entity {
    constructor(payload) {
        super();
        this.ownerId = payload.ownerId;
        this.courseId = payload.courseId;
        this.title = payload.title;
        this.description = payload.description;
        this.pdfDetails = payload.pdfDetails;
        this.keywords = payload.keywords;
        this.type = payload.type;
        this.metadata = payload.metadata;
        this.id = payload.id || (0, uuid_1.v4)();
        this.createdAt = payload.createdAt || new Date();
        this.editedAt = payload.editedAt || null;
        this.removedAt = payload.removedAt || null;
    }
    getOwnerId() {
        return this.ownerId;
    }
    getCourseId() {
        return this.courseId;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getPdfDescription() {
        return this.pdfDetails;
    }
    getKeywords() {
        return this.keywords;
    }
    getType() {
        return this.type;
    }
    getMetadata() {
        return this.metadata;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getEditedAt() {
        return this.editedAt;
    }
    getRemovedAt() {
        return this.removedAt;
    }
    async edit(payload) {
        const currentDate = new Date();
        if (payload.name) {
            this.title = payload.name;
            this.editedAt = currentDate;
        }
        if (payload.metadata) {
            this.metadata = payload.metadata;
            this.editedAt = currentDate;
        }
        await this.validate();
    }
    async remove() {
        this.removedAt = new Date();
        await this.validate();
    }
    static async new(payload) {
        const course = new Course(payload);
        await course.validate();
        return course;
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Course.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Course.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Course.prototype, "pdfDetails", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], Course.prototype, "keywords", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CourseEnums_1.CourseType),
    __metadata("design:type", String)
], Course.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInstance)(FileMetadata_1.FileMetadata),
    __metadata("design:type", FileMetadata_1.FileMetadata)
], Course.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Course.prototype, "editedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Course.prototype, "removedAt", void 0);
exports.Course = Course;
//# sourceMappingURL=Course.js.map