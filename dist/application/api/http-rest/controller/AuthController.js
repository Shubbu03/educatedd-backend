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
exports.AuthController = void 0;
const HttpLocalAuthGuard_1 = require("@application/api/http-rest/auth/guard/HttpLocalAuthGuard");
const HttpAuthService_1 = require("@application/api/http-rest/auth/HttpAuthService");
const HttpRestApiModelLogInBody_1 = require("@application/api/http-rest/controller/documentation/auth/HttpRestApiModelLogInBody");
const HttpRestApiResponseLoggedInUser_1 = require("@application/api/http-rest/controller/documentation/auth/HttpRestApiResponseLoggedInUser");
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(request) {
        return CoreApiResponse_1.CoreApiResponse.success(this.authService.login(request.user));
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(HttpLocalAuthGuard_1.HttpLocalAuthGuard),
    (0, swagger_1.ApiBody)({ type: HttpRestApiModelLogInBody_1.HttpRestApiModelLogInBody }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: HttpRestApiResponseLoggedInUser_1.HttpRestApiResponseLoggedInUser }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [HttpAuthService_1.HttpAuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map