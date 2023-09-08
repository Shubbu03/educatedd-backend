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
exports.HttpRestApiModelPost = void 0;
const HttpRestApiModelPostImage_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiModelPostImage");
const HttpRestApiModelPostOwner_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiModelPostOwner");
const PostEnums_1 = require("@core/common/enums/PostEnums");
const swagger_1 = require("@nestjs/swagger");
class HttpRestApiModelPost {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelPost.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: HttpRestApiModelPostOwner_1.HttpRestApiModelPostOwner }),
    __metadata("design:type", HttpRestApiModelPostOwner_1.HttpRestApiModelPostOwner)
], HttpRestApiModelPost.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: HttpRestApiModelPostImage_1.HttpRestApiModelPostImage }),
    __metadata("design:type", HttpRestApiModelPostImage_1.HttpRestApiModelPostImage)
], HttpRestApiModelPost.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelPost.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], HttpRestApiModelPost.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PostEnums_1.PostStatus }),
    __metadata("design:type", String)
], HttpRestApiModelPost.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    __metadata("design:type", Number)
], HttpRestApiModelPost.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    __metadata("design:type", Number)
], HttpRestApiModelPost.prototype, "editedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', required: false }),
    __metadata("design:type", Number)
], HttpRestApiModelPost.prototype, "publishedAt", void 0);
exports.HttpRestApiModelPost = HttpRestApiModelPost;
//# sourceMappingURL=HttpRestApiModelPost.js.map