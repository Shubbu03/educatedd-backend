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
const HttpRestApiModelCreateCourseQuery_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseQuery");
const HttpRestApiModelEditCourseBody_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiModelEditCourseBody");
const HttpRestApiResponseCourse_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCourse");
const HttpRestApiResponseCourseList_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCourseList");
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
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
const HttpRestApiModelUploadFile_1 = require("./documentation/course/HttpRestApiModelUploadFile");
const UploadFileAdapter_1 = require("@infrastructure/adapter/usecase/course/UploadFileAdapter");
const uuid_1 = require("uuid");
const HttpRestApiResponseEnrolledCourse_1 = require("./documentation/course/HttpRestApiResponseEnrolledCourse");
const HttpRestApiModelEnrolledCourseQuery_1 = require("./documentation/course/HttpRestApiModelEnrolledCourseQuery");
const EnrolledCourseAdapter_1 = require("@infrastructure/adapter/usecase/course/EnrolledCourseAdapter");
const HttpRestApiResponseEnrolledCourseList_1 = require("./documentation/course/HttpRestApiResponseEnrolledCourseList");
const GetEnrolledCourseListAdapter_1 = require("@infrastructure/adapter/usecase/course/GetEnrolledCourseListAdapter");
let CourseController = class CourseController {
    constructor(createCourseUseCase, uploadFileUseCase, editCourseUseCase, enrolledCourseUseCase, getEnrolledCourseListUseCase, getCourseListUseCase, getCourseUseCase, removeCourseUseCase) {
        this.createCourseUseCase = createCourseUseCase;
        this.uploadFileUseCase = uploadFileUseCase;
        this.editCourseUseCase = editCourseUseCase;
        this.enrolledCourseUseCase = enrolledCourseUseCase;
        this.getEnrolledCourseListUseCase = getEnrolledCourseListUseCase;
        this.getCourseListUseCase = getCourseListUseCase;
        this.getCourseUseCase = getCourseUseCase;
        this.removeCourseUseCase = removeCourseUseCase;
    }
    async createCourse(request, query) {
        const adapter = await CreateCourseAdapter_1.CreateCourseAdapter.new({
            executorId: request.user.id,
            title: query.Title,
            description: query.Description,
            pdfDetails: query.pdfDetails,
        });
        console.log("create course adapter from CourseController.ts is::", adapter);
        console.log("query iss::", query);
        const createdCourse = await this.createCourseUseCase.execute(adapter);
        this.setFileStorageBasePath([createdCourse]);
        return CoreApiResponse_1.CoreApiResponse.success(createdCourse);
    }
    async uploadFile(request, file) {
        console.log("Complete request from CourseController.ts is:", request);
        const upload_adapter = await UploadFileAdapter_1.NewUploadFileAdapter.new({
            name: (0, path_1.parse)(file.originalname).name,
            url: request.route.path,
            file: file.buffer,
        });
        const uploadedFile = await this.uploadFileUseCase.execute(upload_adapter);
        return CoreApiResponse_1.CoreApiResponse.success(uploadedFile);
    }
    async editCourse(user, body, id) {
        const adapter = await EditCourseAdapter_1.EditCourseAdapter.new({
            executorId: user.id,
            id: id,
            title: body.title,
            description: body.description,
        });
        const editedCourse = await this.editCourseUseCase.execute(adapter);
        this.setFileStorageBasePath([editedCourse]);
        return CoreApiResponse_1.CoreApiResponse.success(editedCourse);
    }
    async enrolledCourse(request, query) {
        const id = (0, uuid_1.v4)();
        const adapter = await EnrolledCourseAdapter_1.EnrolledCourseAdapter.new({
            courseId: query.CourseID,
            userId: request.user.id,
        });
        console.log("Complete REQUEST from enrolled is::", request);
        console.log("ADAPTER FROM ENROLLED COURSE IS:::::", adapter);
        const enrolledCourse = await this.enrolledCourseUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success(enrolledCourse);
    }
    async getCourseList(user) {
        const adapter = await GetCourseListAdapter_1.GetCourseListAdapter.new({
            executorId: user.id,
        });
        const courses = await this.getCourseListUseCase.execute(adapter);
        this.setFileStorageBasePath(courses);
        console.log("Adapter from get list is::", adapter);
        return CoreApiResponse_1.CoreApiResponse.success(courses);
    }
    async getCourse(user, id) {
        const adapter = await GetCourseAdapter_1.GetCourseAdapter.new({
            executorId: user.id,
            id: id,
        });
        const course = await this.getCourseUseCase.execute(adapter);
        console.log("Adapter from get by id is::", adapter);
        return CoreApiResponse_1.CoreApiResponse.success(course);
    }
    async getEnrolledCourseList(user) {
        const adapter = await GetEnrolledCourseListAdapter_1.GetEnrolledCourseListAdapter.new({
            executorId: user.id,
        });
        const enrolled = await this.getEnrolledCourseListUseCase.execute(adapter);
        console.log("ADAPTER FROM GET ENROLLED ISS::", adapter);
        return CoreApiResponse_1.CoreApiResponse.success(enrolled);
    }
    async removeCourse(user, id) {
        const adapter = await RemoveCourseAdapter_1.RemoveCourseAdapter.new({
            executorId: user.id,
            id: id,
        });
        await this.removeCourseUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success();
    }
    setFileStorageBasePath(courses) {
    }
    setUploadedFilePath(newfile) {
        newfile.forEach((file) => (file.url = (0, url_1.resolve)(FileStorageConfig_1.FileStorageConfig.BASE_PATH, file.url)));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiQuery)({ name: "pdfDetails", type: "string", required: true }),
    (0, swagger_1.ApiQuery)({ name: "Description", type: "string", required: true }),
    (0, swagger_1.ApiQuery)({ name: "Title", type: "string", required: true }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCourse_1.HttpRestApiResponseCourse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelCreateCourseQuery_1.HttpRestApiModelCreateCourseQuery]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)("/upload"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelUploadFile_1.HttpRestApiModelUploadFile }),
    (0, swagger_1.ApiQuery)({ name: "file", type: "string", required: false }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiModelUploadFile_1.HttpRestApiModelUploadFile }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelEditCourseBody_1.HttpRestApiModelEditCourseBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCourse_1.HttpRestApiResponseCourse }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelEditCourseBody_1.HttpRestApiModelEditCourseBody, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "editCourse", null);
__decorate([
    (0, common_1.Post)("/enrolled"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.STUDENT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ name: "CourseID", type: "string", required: true }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: HttpRestApiResponseEnrolledCourse_1.HttpRestApiResponseEnrolledCourse,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiModelEnrolledCourseQuery_1.HttpRestApiModelEnrolledCourseQuery]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "enrolledCourse", null);
__decorate([
    (0, common_1.Get)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.STUDENT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCourseList_1.HttpRestApiResponseCourseList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseList", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.STUDENT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCourse_1.HttpRestApiResponseCourse }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Get)("/enrolled/user"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.STUDENT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseEnrolledCourseList_1.HttpRestApiResponseEnrolledCourseList }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getEnrolledCourseList", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseCourse_1.HttpRestApiResponseCourse }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeCourse", null);
CourseController = __decorate([
    (0, common_1.Controller)("courses"),
    (0, swagger_1.ApiTags)("courses"),
    __param(0, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.CreateCourseUseCase)),
    __param(1, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.UploadFileUseCase)),
    __param(2, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.EditCourseUseCase)),
    __param(3, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.EnrolledCourseUseCase)),
    __param(4, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.GetEnrolledCourseListUseCase)),
    __param(5, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.GetCourseListUseCase)),
    __param(6, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.GetCourseUseCase)),
    __param(7, (0, common_1.Inject)(CourseDITokens_1.CourseDITokens.RemoveCourseUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=CourseController.js.map