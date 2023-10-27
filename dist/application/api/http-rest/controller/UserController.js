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
exports.UserController = void 0;
const HttpAuth_1 = require("@application/api/http-rest/auth/decorator/HttpAuth");
const HttpUser_1 = require("@application/api/http-rest/auth/decorator/HttpUser");
const HttpRestApiModelCreateUserBody_1 = require("@application/api/http-rest/controller/documentation/user/HttpRestApiModelCreateUserBody");
const HttpRestApiResponseUser_1 = require("@application/api/http-rest/controller/documentation/user/HttpRestApiResponseUser");
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
const UserEnums_1 = require("@core/common/enums/UserEnums");
const UserDITokens_1 = require("@core/domain/user/di/UserDITokens");
const CreateUserAdapter_1 = require("@infrastructure/adapter/usecase/user/CreateUserAdapter");
const GetUserAdapter_1 = require("@infrastructure/adapter/usecase/user/GetUserAdapter");
const EditUserAdapter_1 = require("@infrastructure/adapter/usecase/user/EditUserAdapter");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const HttpRestApiEditUser_1 = require("./documentation/user/HttpRestApiEditUser");
let UserController = class UserController {
    constructor(createUserUseCase, getUserUseCase, editUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.editUserUseCase = editUserUseCase;
    }
    async createAccount(body) {
        const adapter = await CreateUserAdapter_1.CreateUserAdapter.new({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            password: body.password,
        });
        const createdUser = await this.createUserUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success(createdUser);
    }
    async getMe(httpUser) {
        const adapter = await GetUserAdapter_1.GetUserAdapter.new({
            userId: httpUser.id,
        });
        const user = await this.getUserUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success(user);
    }
    async editUser(user, body, userID) {
        const adapter = await EditUserAdapter_1.EditUserAdapter.new({
            id: user.id,
            firstName: String(body.firstName),
            lastName: String(body.lastName),
            email: String(body.email),
            password: String(body.password),
        });
        console.log("COMPLETE ADAPTER FROM PUT IS::", adapter);
        const edited = await this.editUserUseCase.execute(adapter);
        return CoreApiResponse_1.CoreApiResponse.success(edited);
    }
};
__decorate([
    (0, common_1.Post)("account"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelCreateUserBody_1.HttpRestApiModelCreateUserBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseUser_1.HttpRestApiResponseUser }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HttpRestApiModelCreateUserBody_1.HttpRestApiModelCreateUserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.GUEST, UserEnums_1.UserRole.STUDENT),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseUser_1.HttpRestApiResponseUser }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Put)("edit/:userId"),
    (0, HttpAuth_1.HttpAuth)(UserEnums_1.UserRole.ADMIN, UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.STUDENT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: HttpRestApiEditUser_1.HttpRestApiEditUser }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseUser_1.HttpRestApiResponseUser }),
    __param(0, (0, HttpUser_1.HttpUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("userID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HttpRestApiEditUser_1.HttpRestApiEditUser, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    (0, swagger_1.ApiTags)("users"),
    __param(0, (0, common_1.Inject)(UserDITokens_1.UserDITokens.CreateUserUseCase)),
    __param(1, (0, common_1.Inject)(UserDITokens_1.UserDITokens.GetUserUseCase)),
    __param(2, (0, common_1.Inject)(UserDITokens_1.UserDITokens.EditUserUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map