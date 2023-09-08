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
var MediaUseCaseDto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUseCaseDto = void 0;
const MediaEnums_1 = require("@core/common/enums/MediaEnums");
const class_transformer_1 = require("class-transformer");
let MediaUseCaseDto = MediaUseCaseDto_1 = class MediaUseCaseDto {
    static newFromMedia(media) {
        const dto = (0, class_transformer_1.plainToClass)(MediaUseCaseDto_1, media);
        dto.url = media.getMetadata().relativePath;
        dto.createdAt = media.getCreatedAt().getTime();
        dto.editedAt = media.getEditedAt()?.getTime() || null;
        return dto;
    }
    static newListFromMedias(medias) {
        return medias.map(media => this.newFromMedia(media));
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MediaUseCaseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MediaUseCaseDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MediaUseCaseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MediaUseCaseDto.prototype, "type", void 0);
MediaUseCaseDto = MediaUseCaseDto_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], MediaUseCaseDto);
exports.MediaUseCaseDto = MediaUseCaseDto;
//# sourceMappingURL=MediaUseCaseDto.js.map