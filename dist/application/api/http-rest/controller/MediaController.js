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
exports.MediaController = void 0;
const HttpAuth_1 = require("@application/api/http-rest/auth/decorator/HttpAuth");
const HttpUser_1 = require("@application/api/http-rest/auth/decorator/HttpUser");
const HttpRestApiModelCreateMediaBody_1 = require("@application/api/http-rest/controller/documentation/media/HttpRestApiModelCreateMediaBody");
const HttpRestApiModelCreateMediaQuery_1 = require("@application/api/http-rest/controller/documentation/media/HttpRestApiModelCreateMediaQuery");
const HttpRestApiModelEditMediaBody_1 = require("@application/api/http-rest/controller/documentation/media/HttpRestApiModelEditMediaBody");
const HttpRestApiResponseMedia_1 = require("@application/api/http-rest/controller/documentation/media/HttpRestApiResponseMedia");
const HttpRestApiResponseMediaList_1 = require("@application/api/http-rest/controller/documentation/media/HttpRestApiResponseMediaList");
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
const MediaEnums_1 = require("@core/common/enums/MediaEnums");
const UserEnums_1 = require("@core/common/enums/UserEnums");
const MediaDITokens_1 = require("@core/domain/media/di/MediaDITokens");
const CreateMediaAdapter_1 = require("@infrastructure/adapter/usecase/media/CreateMediaAdapter");
const EditMediaAdapter_1 = require("@infrastructure/adapter/usecase/media/EditMediaAdapter");
const GetMediaAdapter_1 = require("@infrastructure/adapter/usecase/media/GetMediaAdapter");
const GetMediaListAdapter_1 = require("@infrastructure/adapter/usecase/media/GetMediaListAdapter");
const RemoveMediaAdapter_1 = require("@infrastructure/adapter/usecase/media/RemoveMediaAdapter");
const FileStorageConfig_1 = require("@infrastructure/config/FileStorageConfig");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const url_1 = require("url");
let MediaController = class MediaController {
    constructor(createMediaUseCase, editMediaUseCase, getMediaListUseCase, getMediaUseCase, removeMediaUseCase) {
        this.createMediaUseCase = createMediaUseCase;
        this.editMediaUseCase = editMediaUseCase;
        this.getMediaListUseCase = getMediaListUseCase;
        this.getMediaUseCase = getMediaUseCase;
        this.removeMediaUseCase = removeMediaUseCase;
    }
    async createMedia(request, file, query) {
        const adapter = await CreateMediaAdapter_1.CreateMediaAdapter.new({
            executorId: request.user.id,
            name: query.name || (0, path_1.parse)(file.originalname).name,
            type: query.type,
            file: file.buffer,
        });
        const createdMedia = await this.createMediaUseCase.execute(adapter);
        this.setFileStorageBasePath([createdMedia]);
        return CoreApiResponse_1.CoreApiResponse.success(createdMedia);
    }
    async editMedia(user, body, mediaId) {
        const adapter = await EditMediaAdapter_1.EditMediaAdapter.new({
            mediaId: mediaId,
            executorId: user.id,
            name: body.name,
        });
        const editedMedia = await this.editMediaUseCase.execute(adapter);
        this.setFileStorageBasePath([editedMedia]);
        return CoreApiResponse_1.CoreApiResponse.success(editedMedia);
    }
    async getMediaList(user) {
        const adapter = await GetMediaListAdapter_1.GetMediaListAdapter.new({
            executorId: user.id,
        });
        const medias = await this.getMediaListUseCase.execute(adapter);
        this.setFileStorageBasePath(medias);
        return CoreApiResponse_1.CoreApiResponse.success(medias);
    }
    async getMedia(user, mediaId) {
        const adapter = await GetMediaAdapter_1.GetMediaAdapter.new({
            executorId: user.id,
            mediaId: mediaId,
        });
        const media = await this.getMediaUseCase.execute(adapter);
        this.setFileStorageBasePath([media]);
        return CoreApiResponse_1.CoreApiResponse.success(media);
    }
    async removeMedia(user, mediaId) {
        const adapter = await RemoveMediaAdapter_1.RemoveMediaAdapter.new({
            executorId: user.id,
            mediaId: mediaId,
        });
        await this.removeMediaUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success();
    }
    setFileStorageBasePath(medias) {
        medias.forEach((media) => (media.url = (0, url_1.resolve)(FileStorageConfig_1.FileStorageConfig.BASE_PATH, media.url)));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelCreateMediaBody_1.HttpRestApiModelCreateMediaBody }),
    (0, swagger_1.ApiQuery)({ name: "name", type: "string", required: false }),
    (0, swagger_1.ApiQuery)({ name: "type", enum: MediaEnums_1.MediaType }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseMedia_1.HttpRestApiResponseMedia }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, HttpRestApiModelCreateMediaQuery_1.HttpRestApiModelCreateMediaQuery]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "createMedia", null);
__decorate([
    (0, common_1.Put)(":mediaId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelEditMediaBody_1.HttpRestApiModelEditMediaBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseMedia_1.HttpRestApiResponseMedia }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("mediaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelEditMediaBody_1.HttpRestApiModelEditMediaBody, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "editMedia", null);
__decorate([
    (0, common_1.Get)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseMediaList_1.HttpRestApiResponseMediaList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getMediaList", null);
__decorate([
    (0, common_1.Get)(":mediaId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseMedia_1.HttpRestApiResponseMedia }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)("mediaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getMedia", null);
__decorate([
    (0, common_1.Delete)(":mediaId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseMedia_1.HttpRestApiResponseMedia }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)("mediaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "removeMedia", null);
MediaController = __decorate([
    (0, common_1.Controller)("medias"),
    (0, swagger_1.ApiTags)("medias"),
    __param(0, (0, common_1.Inject)(MediaDITokens_1.MediaDITokens.CreateMediaUseCase)),
    __param(1, (0, common_1.Inject)(MediaDITokens_1.MediaDITokens.EditMediaUseCase)),
    __param(2, (0, common_1.Inject)(MediaDITokens_1.MediaDITokens.GetMediaListUseCase)),
    __param(3, (0, common_1.Inject)(MediaDITokens_1.MediaDITokens.GetMediaUseCase)),
    __param(4, (0, common_1.Inject)(MediaDITokens_1.MediaDITokens.RemoveMediaUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map