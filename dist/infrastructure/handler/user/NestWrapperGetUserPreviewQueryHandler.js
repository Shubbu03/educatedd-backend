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
exports.NestWrapperGetUserPreviewQueryHandler = void 0;
const GetUserPreviewQuery_1 = require("@core/common/message/query/queries/user/GetUserPreviewQuery");
const UserDITokens_1 = require("@core/domain/user/di/UserDITokens");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
let NestWrapperGetUserPreviewQueryHandler = class NestWrapperGetUserPreviewQueryHandler {
    constructor(handleService) {
        this.handleService = handleService;
    }
    async execute(query) {
        return this.handleService.handle(query);
    }
};
NestWrapperGetUserPreviewQueryHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.QueryHandler)(GetUserPreviewQuery_1.GetUserPreviewQuery),
    __param(0, (0, common_1.Inject)(UserDITokens_1.UserDITokens.GetUserPreviewQueryHandler)),
    __metadata("design:paramtypes", [Object])
], NestWrapperGetUserPreviewQueryHandler);
exports.NestWrapperGetUserPreviewQueryHandler = NestWrapperGetUserPreviewQueryHandler;
//# sourceMappingURL=NestWrapperGetUserPreviewQueryHandler.js.map