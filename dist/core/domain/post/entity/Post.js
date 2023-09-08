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
exports.Post = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const PostEnums_1 = require("@core/common/enums/PostEnums");
const PostImage_1 = require("@core/domain/post/entity/PostImage");
const PostOwner_1 = require("@core/domain/post/entity/PostOwner");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class Post extends Entity_1.Entity {
    constructor(payload) {
        super();
        this.owner = payload.owner;
        this.title = payload.title;
        this.image = payload.image || null;
        this.content = payload.content || null;
        this.id = payload.id || (0, uuid_1.v4)();
        this.status = payload.status || PostEnums_1.PostStatus.DRAFT;
        this.createdAt = payload.createdAt || new Date();
        this.editedAt = payload.editedAt || null;
        this.publishedAt = payload.publishedAt || null;
        this.removedAt = payload.removedAt || null;
    }
    getOwner() {
        return this.owner;
    }
    getTitle() {
        return this.title;
    }
    getImage() {
        return this.image;
    }
    getContent() {
        return this.content;
    }
    getStatus() {
        return this.status;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getEditedAt() {
        return this.editedAt;
    }
    getPublishedAt() {
        return this.publishedAt;
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
        if (typeof payload.image !== 'undefined') {
            this.image = payload.image;
            this.editedAt = currentDate;
        }
        if (typeof payload.content !== 'undefined') {
            this.content = payload.content;
            this.editedAt = currentDate;
        }
        await this.validate();
    }
    async publish() {
        const currentDate = new Date();
        this.status = PostEnums_1.PostStatus.PUBLISHED;
        this.editedAt = currentDate;
        this.publishedAt = currentDate;
        await this.validate();
    }
    async remove() {
        this.removedAt = new Date();
        await this.validate();
    }
    static async new(payload) {
        const post = new Post(payload);
        await post.validate();
        return post;
    }
}
__decorate([
    (0, class_validator_1.IsInstance)(PostOwner_1.PostOwner),
    __metadata("design:type", PostOwner_1.PostOwner)
], Post.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInstance)(PostImage_1.PostImage),
    __metadata("design:type", Object)
], Post.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Post.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PostEnums_1.PostStatus),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Post.prototype, "editedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Post.prototype, "publishedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], Post.prototype, "removedAt", void 0);
exports.Post = Post;
//# sourceMappingURL=Post.js.map