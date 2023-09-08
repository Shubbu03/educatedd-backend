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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRoleAuthGuard = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let HttpRoleAuthGuard = class HttpRoleAuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler()) || [];
        const request = context.switchToHttp().getRequest();
        const canActivate = roles.length > 0
            ? roles.includes(request.user.role)
            : true;
        if (!canActivate) {
            throw Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR });
        }
        return canActivate;
    }
};
HttpRoleAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], HttpRoleAuthGuard);
exports.HttpRoleAuthGuard = HttpRoleAuthGuard;
//# sourceMappingURL=HttpRoleAuthGuard.js.map