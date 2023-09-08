"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestHttpLoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestHttpLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let NestHttpLoggingInterceptor = NestHttpLoggingInterceptor_1 = class NestHttpLoggingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const requestStartDate = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const requestFinishDate = Date.now();
            const message = `Method: ${request.method}; ` +
                `Path: ${request.path}; ` +
                `SpentTime: ${requestFinishDate - requestStartDate}ms`;
            common_1.Logger.log(message, NestHttpLoggingInterceptor_1.name);
        }));
    }
};
NestHttpLoggingInterceptor = NestHttpLoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], NestHttpLoggingInterceptor);
exports.NestHttpLoggingInterceptor = NestHttpLoggingInterceptor;
//# sourceMappingURL=NestHttpLoggingInterceptor.js.map