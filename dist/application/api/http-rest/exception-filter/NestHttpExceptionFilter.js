"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestHttpExceptionFilter = void 0;
const CoreApiResponse_1 = require("@core/common/api/CoreApiResponse");
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const ApiServerConfig_1 = require("@infrastructure/config/ApiServerConfig");
const common_1 = require("@nestjs/common");
let NestHttpExceptionFilter = class NestHttpExceptionFilter {
    catch(error, host) {
        const request = host.switchToHttp().getRequest();
        const response = host.switchToHttp().getResponse();
        let errorResponse = CoreApiResponse_1.CoreApiResponse.error(Code_1.Code.INTERNAL_ERROR.code, error.message);
        errorResponse = this.handleNestError(error, errorResponse);
        errorResponse = this.handleCoreException(error, errorResponse);
        if (ApiServerConfig_1.ApiServerConfig.LOG_ENABLE) {
            const message = `Method: ${request.method}; ` +
                `Path: ${request.path}; ` +
                `Error: ${errorResponse.message}`;
            common_1.Logger.error(message);
        }
        response.json(errorResponse);
    }
    handleNestError(error, errorResponse) {
        if (error instanceof common_1.HttpException) {
            errorResponse = CoreApiResponse_1.CoreApiResponse.error(error.getStatus(), error.message, null);
        }
        if (error instanceof common_1.UnauthorizedException) {
            errorResponse = CoreApiResponse_1.CoreApiResponse.error(Code_1.Code.UNAUTHORIZED_ERROR.code, Code_1.Code.UNAUTHORIZED_ERROR.message, null);
        }
        return errorResponse;
    }
    handleCoreException(error, errorResponse) {
        if (error instanceof Exception_1.Exception) {
            errorResponse = CoreApiResponse_1.CoreApiResponse.error(error.code, error.message, error.data);
        }
        return errorResponse;
    }
};
NestHttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], NestHttpExceptionFilter);
exports.NestHttpExceptionFilter = NestHttpExceptionFilter;
//# sourceMappingURL=NestHttpExceptionFilter.js.map