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
exports.CourseController = void 0;
const HttpAuth_1 = require("@application/api/http-rest/auth/decorator/HttpAuth");
const HttpUser_1 = require("@application/api/http-rest/auth/decorator/HttpUser");
const HttpRestApiModelCreateCourseBody_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseBody");
const HttpRestApiModelCreateCourseQuery_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseQuery");
const HttpRestApiModelEditCourseBody_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiModelEditCourseBody");
const HttpRestApiResponseCOurse_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCOurse");
const HttpRestApiResponseCourseList_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCourseList");
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
const CourseEnums_1 = require("@core/common/enums/CourseEnums");
const UserEnums_1 = require("@core/common/enums/UserEnums");
const CourseDITokens_1 = require("@core/domain/course/di/CourseDITokens");
const CreateCourseAdapter_1 = require("@infrastructure/adapter/usecase/course/CreateCourseAdapter");
const EditCourseAdapter_1 = require("@infrastructure/adapter/usecase/course/EditCourseAdapter");
const GetCourseAdapter_1 = require("@infrastructure/adapter/usecase/course/GetCourseAdapter");
const GetCourseListAdapter_1 = require("@infrastructure/adapter/usecase/course/GetCourseListAdapter");
const RemoveCourseAdapter_1 = require("@infrastructure/adapter/usecase/course/RemoveCourseAdapter");
const FileStorageConfig_1 = require("@infrastructure/config/FileStorageConfig");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const url_1 = require("url");
let CourseController = class CourseController {
    constructor(createCourseUseCase, editCourseUseCase, getCourseListUseCase, getCourseUseCase, removeCourseUseCase) {
        this.createCourseUseCase = createCourseUseCase;
        this.editCourseUseCase = editCourseUseCase;
        this.getCourseListUseCase = getCourseListUseCase;
        this.getCourseUseCase = getCourseUseCase;
        this.removeCourseUseCase = removeCourseUseCase;
    }
    async createCourse(request, file, query) {
        const adapter = await CreateCourseAdapter_1.CreateCourseAdapter.new({
            executorId: request.user.id,
            courseId: request.user.id,
            name: query.name || (0, path_1.parse)(file.originalname).name,
            type: query.type,
            file: file.buffer,
        });
        const createdCourse = await this.createCourseUseCase.execute(adapter);
        this.setFileStorageBasePath([createdCourse]);
        return CoreApiResponse_1.CoreApiResponse.success(createdCourse);
    }
    async editCourse(user, body, courseId) {
        const adapter = await EditCourseAdapter_1.EditCourseAdapter.new({
            executorId: user.id,
            courseId: courseId,
            name: body.name,
        });
        const editedCourse = await this.editCourseUseCase.execute(adapter);
        this.setFileStorageBasePath([editedCourse]);
        return CoreApiResponse_1.CoreApiResponse.success(editedCourse);
    }
    async getCourseList(user) {
        const adapter = await GetCourseListAdapter_1.GetCourseListAdapter.new({
            executorId: user.id,
        });
        const courses = await this.getCourseListUseCase.execute(adapter);
        this.setFileStorageBasePath(courses);
        return CoreApiResponse_1.CoreApiResponse.success(courses);
    }
    async getCourse(user, courseId) {
        const adapter = await GetCourseAdapter_1.GetCourseAdapter.new({
            executorId: user.id,
            courseId: courseId,
        });
        const course = await this.getCourseUseCase.execute(adapter);
        this.setFileStorageBasePath([course]);
        return CoreApiResponse_1.CoreApiResponse.success(course);
    }
    async removeCourse(user, courseId) {
        const adapter = await RemoveCourseAdapter_1.RemoveCourseAdapter.new({
            executorId: user.id,
            courseId: courseId,
        });
        await this.removeCourseUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success();
    }
    setFileStorageBasePath(courses) {
        courses.forEach((course) => (course.url = (0, url_1.resolve)(FileStorageConfig_1.FileStorageConfig.BASE_PATH, course.url)));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelCreateCourseBody_1.HttpRestApiModelCreateCourseBody }),
    (0, swagger_1.ApiQuery)({ name: "name", type: "string", required: false }),
    (0, swagger_1.ApiQuery)({ name: "type", enum: CourseEnums_1.CourseType }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCOurse_1.HttpRestApiResponseCourse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, HttpRestApiModelCreateCourseQuery_1.HttpRestApiModelCreateCourseQuery]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Put)(":courseId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelEditCourseBody_1.HttpRestApiModelEditCourseBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCOurse_1.HttpRestApiResponseCourse }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelEditCourseBody_1.HttpRestApiModelEditCourseBody, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "editCourse", null);
__decorate([
    (0, common_1.Get)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCourseList_1.HttpRestApiResponseCourseList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseList", null);
__decorate([
    (0, common_1.Get)(":courseId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCOurse_1.HttpRestApiResponseCourse }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Delete)(":courseId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCOurse_1.HttpRestApiResponseCourse }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeCourse", null);
CourseController = __decorate([
    (0, common_1.Controller)("courses"),
    (0, swagger_1.ApiTags)("courses"),
    __param(0, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.CreateCourseUseCase)),
    __param(1, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.EditCourseUseCase)),
    __param(2, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.GetCourseListUseCase)),
    __param(3, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.GetCourseUseCase)),
    __param(4, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.RemoveCourseUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=CourseController.js.map