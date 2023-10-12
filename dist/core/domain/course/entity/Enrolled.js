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
exports.Enrolled = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const class_validator_1 = require("class-validator");
class Enrolled extends Entity_1.Entity {
    constructor(payload) {
        super();
        this.ownerId = payload.ownerId;
        this.courseID = payload.courseID;
        this.userID = payload.userID;
        this.chapter = payload.chapter;
        this.createdAt = payload.createdAt || new Date();
        this.editedAt = payload.editedAt || null;
        this.removedAt = payload.removedAt || null;
    }
    getOwnerId() {
        console.log("OWNERID ISS::", this.ownerId);
        return this.ownerId;
    }
    getCourseID() {
        return this.courseID;
    }
    getUserID() {
        console.log("OWNERID ISS::", this.userID);
        return this.userID;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getEditedAt() {
        return this.editedAt;
    }
    getChapter() {
        return this.chapter;
    }
    getRemovedAt() {
        return this.removedAt;
    }
    async remove() {
        this.removedAt = new Date();
        await this.validate();
    }
    static async new(payload) {
        const course = new Enrolled(payload);
        await course.validate();
        return course;
    }
    async edit_complete(payload) {
        const currentDate = new Date();
        if (payload.chapterCompleted) {
            console.log("ONLY THIS GETTING PRINTED FROM edit_complete:::::");
            this.chapter = payload.chapterCompleted;
            this.courseID = payload.courseID;
            this.userID = payload.id;
            this.editedAt = currentDate;
        }
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Enrolled.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Enrolled.prototype, "courseID", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Enrolled.prototype, "userID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Enrolled.prototype, "chapter", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Enrolled.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Enrolled.prototype, "editedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Enrolled.prototype, "removedAt", void 0);
exports.Enrolled = Enrolled;
//# sourceMappingURL=Enrolled.js.map