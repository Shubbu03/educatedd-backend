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
exports.HttpJwtStrategy = void 0;
const HttpAuthService_1 = require("@application/api/http-rest/auth/HttpAuthService");
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const ApiServerConfig_1 = require("@infrastructure/config/ApiServerConfig");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
let HttpJwtStrategy = class HttpJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader(ApiServerConfig_1.ApiServerConfig.ACCESS_TOKEN_HEADER),
            ignoreExpiration: false,
            secretOrKey: ApiServerConfig_1.ApiServerConfig.ACCESS_TOKEN_SECRET,
        });
        this.authService = authService;
    }
    async validate(payload) {
        const user = CoreAssert_1.CoreAssert.notEmpty(await this.authService.getUser({ id: payload.id }), Exception_1.Exception.new({ code: Code_1.Code.UNAUTHORIZED_ERROR }));
        return { id: user.getId(), email: user.getEmail(), role: user.getRole() };
    }
};
HttpJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [HttpAuthService_1.HttpAuthService])
], HttpJwtStrategy);
exports.HttpJwtStrategy = HttpJwtStrategy;
//# sourceMappingURL=HttpJwtStrategy.js.map