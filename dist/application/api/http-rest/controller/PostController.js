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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const HttpAuth_1 = require("@application/api/http-rest/auth/decorator/HttpAuth");
const HttpUser_1 = require("@application/api/http-rest/auth/decorator/HttpUser");
const HttpRestApiModelCreatePostBody_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiModelCreatePostBody");
const HttpRestApiModelEditPostBody_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiModelEditPostBody");
const HttpRestApiModelGetPostListQuery_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiModelGetPostListQuery");
const HttpRestApiResponsePost_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiResponsePost");
const HttpRestApiResponsePostList_1 = require("@application/api/http-rest/controller/documentation/post/HttpRestApiResponsePostList");
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
const PostEnums_1 = require("@core/common/enums/PostEnums");
const UserEnums_1 = require("@core/common/enums/UserEnums");
const PostDITokens_1 = require("@core/domain/post/di/PostDITokens");
const CreatePostAdapter_1 = require("@infrastructure/adapter/usecase/post/CreatePostAdapter");
const EditPostAdapter_1 = require("@infrastructure/adapter/usecase/post/EditPostAdapter");
const GetPostAdapter_1 = require("@infrastructure/adapter/usecase/post/GetPostAdapter");
const GetPostListAdapter_1 = require("@infrastructure/adapter/usecase/post/GetPostListAdapter");
const PublishPostAdapter_1 = require("@infrastructure/adapter/usecase/post/PublishPostAdapter");
const RemovePostAdapter_1 = require("@infrastructure/adapter/usecase/post/RemovePostAdapter");
const FileStorageConfig_1 = require("@infrastructure/config/FileStorageConfig");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const url_1 = require("url");
let PostController = class PostController {
    constructor(createPostUseCase, editPostUseCase, getPostListUseCase, getPostUseCase, publishPostUseCase, removePostUseCase) {
        this.createPostUseCase = createPostUseCase;
        this.editPostUseCase = editPostUseCase;
        this.getPostListUseCase = getPostListUseCase;
        this.getPostUseCase = getPostUseCase;
        this.publishPostUseCase = publishPostUseCase;
        this.removePostUseCase = removePostUseCase;
    }
    async createPost(user, body) {
        const adapter = await CreatePostAdapter_1.CreatePostAdapter.new({
            executorId: user.id,
            title: body.title,
            imageId: body.imageId,
            content: body.content,
        });
        const createdPost = await this.createPostUseCase.execute(adapter);
        this.setFileStorageBasePath([createdPost]);
        return CoreApiResponse_1.CoreApiResponse.success(createdPost);
    }
    async editPost(user, body, postId) {
        const adapter = await EditPostAdapter_1.EditPostAdapter.new({
            executorId: user.id,
            postId: postId,
            title: body.title,
            content: body.content,
            imageId: body.imageId,
        });
        const editedPost = await this.editPostUseCase.execute(adapter);
        this.setFileStorageBasePath([editedPost]);
        return CoreApiResponse_1.CoreApiResponse.success(editedPost);
    }
    async getPostList(user, query) {
        const adapter = await GetPostListAdapter_1.GetPostListAdapter.new({
            executorId: user.id,
            ownerId: query.authorId,
            status: PostEnums_1.PostStatus.PUBLISHED
        });
        const posts = await this.getPostListUseCase.execute(adapter);
        this.setFileStorageBasePath(posts);
        return CoreApiResponse_1.CoreApiResponse.success(posts);
    }
    async getMinePostList(user) {
        const adapter = await GetPostListAdapter_1.GetPostListAdapter.new({
            executorId: user.id,
            ownerId: user.id,
        });
        const posts = await this.getPostListUseCase.execute(adapter);
        this.setFileStorageBasePath(posts);
        return CoreApiResponse_1.CoreApiResponse.success(posts);
    }
    async getPost(user, postId) {
        const adapter = await GetPostAdapter_1.GetPostAdapter.new({ executorId: user.id, postId: postId });
        const post = await this.getPostUseCase.execute(adapter);
        this.setFileStorageBasePath([post]);
        return CoreApiResponse_1.CoreApiResponse.success(post);
    }
    async publishPost(user, postId) {
        const adapter = await PublishPostAdapter_1.PublishPostAdapter.new({ executorId: user.id, postId: postId });
        const post = await this.publishPostUseCase.execute(adapter);
        this.setFileStorageBasePath([post]);
        return CoreApiResponse_1.CoreApiResponse.success(post);
    }
    async removePost(user, postId) {
        const adapter = await RemovePostAdapter_1.RemovePostAdapter.new({ executorId: user.id, postId: postId });
        await this.removePostUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success();
    }
    setFileStorageBasePath(posts) {
        posts.forEach((post) => {
            if (post.image) {
                post.image.url = (0, url_1.resolve)(FileStorageConfig_1.FileStorageConfig.BASE_PATH, post.image.url);
            }
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelCreatePostBody_1.HttpRestApiModelCreatePostBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePost_1.HttpRestApiResponsePost }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelCreatePostBody_1.HttpRestApiModelCreatePostBody]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)(':postId'),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelEditPostBody_1.HttpRestApiModelEditPostBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePost_1.HttpRestApiResponsePost }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelCreatePostBody_1.HttpRestApiModelCreatePostBody, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "editPost", null);
__decorate([
    (0, common_1.Get)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.GUEST),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ name: 'authorId', type: 'string', required: false }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePostList_1.HttpRestApiResponsePostList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelGetPostListQuery_1.HttpRestApiModelGetPostListQuery]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostList", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePostList_1.HttpRestApiResponsePostList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getMinePostList", null);
__decorate([
    (0, common_1.Get)(':postId'),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.GUEST),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePostList_1.HttpRestApiResponsePostList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)(':postId/publish'),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePostList_1.HttpRestApiResponsePostList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "publishPost", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponsePostList_1.HttpRestApiResponsePostList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "removePost", null);
PostController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, swagger_1.ApiTags)('posts'),
    __param(0, (0, common_1.Inject)(PostDITokens_1.PostDITokens.CreatePostUseCase)),
    __param(1, (0, common_1.Inject)(PostDITokens_1.PostDITokens.EditPostUseCase)),
    __param(2, (0, common_1.Inject)(PostDITokens_1.PostDITokens.GetPostListUseCase)),
    __param(3, (0, common_1.Inject)(PostDITokens_1.PostDITokens.GetPostUseCase)),
    __param(4, (0, common_1.Inject)(PostDITokens_1.PostDITokens.PublishPostUseCase)),
    __param(5, (0, common_1.Inject)(PostDITokens_1.PostDITokens.RemovePostUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map