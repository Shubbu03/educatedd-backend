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
var PostUseCaseDto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUseCaseDto = void 0;
const PostEnums_1 = require("@core/common/enums/PostEnums");
const class_transformer_1 = require("class-transformer");
let PostUseCaseDto = PostUseCaseDto_1 = class PostUseCaseDto {
    static newFromPost(post) {
        const dto = (0, class_transformer_1.plainToClass)(PostUseCaseDto_1, post);
        const postOwner = post.getOwner();
        const postImage = post.getImage();
        dto.owner = { id: postOwner.getId(), name: postOwner.getName(), role: postOwner.getRole() };
        dto.image = null;
        if (postImage) {
            dto.image = { id: postImage.getId(), url: postImage.getRelativePath() };
        }
        dto.createdAt = post.getCreatedAt().getTime();
        dto.editedAt = post.getEditedAt()?.getTime() || null;
        dto.publishedAt = post.getPublishedAt()?.getTime() || null;
        return dto;
    }
    static newListFromPosts(posts) {
        return posts.map(post => this.newFromPost(post));
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostUseCaseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostUseCaseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostUseCaseDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostUseCaseDto.prototype, "status", void 0);
PostUseCaseDto = PostUseCaseDto_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], PostUseCaseDto);
exports.PostUseCaseDto = PostUseCaseDto;
//# sourceMappingURL=PostUseCaseDto.js.map