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
exports.Media = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const MediaEnums_1 = require("@core/common/enums/MediaEnums");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class Media extends Entity_1.Entity {
    constructor(payload) {
        super();
        this.ownerId = payload.ownerId;
        this.name = payload.name;
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
    getName() {
        return this.name;
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
            this.name = payload.name;
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
        const media = new Media(payload);
        await media.validate();
        return media;
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Media.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Media.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(MediaEnums_1.MediaType),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInstance)(FileMetadata_1.FileMetadata),
    __metadata("design:type", FileMetadata_1.FileMetadata)
], Media.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Media.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Media.prototype, "editedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Media.prototype, "removedAt", void 0);
exports.Media = Media;
//# sourceMappingURL=Media.js.map