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
exports.UploadFile = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const class_validator_1 = require("class-validator");
class UploadFile extends Entity_1.Entity {
    constructor(payload) {
        super();
        this.metadata = payload.metadata;
        this.createdAt = payload.createdAt || new Date();
        this.editedAt = payload.editedAt || null;
        this.removedAt = payload.removedAt || null;
    }
    getPdfDescription() {
        return this.pdfDetail;
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
    static async new(payload) {
        const course = new UploadFile(payload);
        return course;
    }
    async remove() {
        this.removedAt = new Date();
        await this.validate();
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadFile.prototype, "pdfDetail", void 0);
__decorate([
    (0, class_validator_1.IsInstance)(FileMetadata_1.FileMetadata),
    __metadata("design:type", FileMetadata_1.FileMetadata)
], UploadFile.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UploadFile.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], UploadFile.prototype, "editedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], UploadFile.prototype, "removedAt", void 0);
exports.UploadFile = UploadFile;
//# sourceMappingURL=UploadFile.js.map