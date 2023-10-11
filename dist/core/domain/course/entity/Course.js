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
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class Course extends Entity_1.Entity {
    constructor(payload) {
        super();
        this.ownerId = payload.ownerId;
        this.title = payload.title;
        this.description = payload.description;
        this.pdfDetails = payload.pdfDetails;
        this.chapter = payload.chapter;
        this.id = payload.id || (0, uuid_1.v4)();
        this.createdAt = payload.createdAt || new Date();
        this.editedAt = payload.editedAt || null;
        this.removedAt = payload.removedAt || null;
    }
    getOwnerId() {
        return this.ownerId;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getChapter() {
        return this.chapter;
    }
    getPdfDescription() {
        return this.pdfDetails;
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
        if (payload.title) {
            this.title = payload.title;
            this.editedAt = currentDate;
        }
        if (payload.description) {
            this.description = payload.description;
            this.editedAt = currentDate;
        }
        if (payload.metadata) {
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
        console.log("payload from Course.ts is::", course);
        return course;
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Course.prototype, "ownerId", void 0);
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
], Course.prototype, "chapter", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Course.prototype, "pdfDetails", void 0);
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