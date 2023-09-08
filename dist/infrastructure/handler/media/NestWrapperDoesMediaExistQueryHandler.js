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
exports.NestWrapperDoesMediaExistQueryHandler = void 0;
const DoesMediaExistQuery_1 = require("@core/common/message/query/queries/media/DoesMediaExistQuery");
const MediaDITokens_1 = require("@core/domain/media/di/MediaDITokens");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
let NestWrapperDoesMediaExistQueryHandler = class NestWrapperDoesMediaExistQueryHandler {
    constructor(handleService) {
        this.handleService = handleService;
    }
    async execute(query) {
        return this.handleService.handle(query);
    }
};
NestWrapperDoesMediaExistQueryHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.QueryHandler)(DoesMediaExistQuery_1.DoesMediaExistQuery),
    __param(0, (0, common_1.Inject)(MediaDITokens_1.MediaDITokens.DoesMediaExistQueryHandler)),
    __metadata("design:paramtypes", [Object])
], NestWrapperDoesMediaExistQueryHandler);
exports.NestWrapperDoesMediaExistQueryHandler = NestWrapperDoesMediaExistQueryHandler;
//# sourceMappingURL=NestWrapperDoesMediaExistQueryHandler.js.map