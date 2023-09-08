"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const HttpAuthService_1 = require("@application/api/http-rest/auth/HttpAuthService");
const HttpJwtStrategy_1 = require("@application/api/http-rest/auth/passport/HttpJwtStrategy");
const HttpLocalStrategy_1 = require("@application/api/http-rest/auth/passport/HttpLocalStrategy");
const AuthController_1 = require("@application/api/http-rest/controller/AuthController");
const UserModule_1 = require("@application/di/UserModule");
const ApiServerConfig_1 = require("@infrastructure/config/ApiServerConfig");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            AuthController_1.AuthController
        ],
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: ApiServerConfig_1.ApiServerConfig.ACCESS_TOKEN_SECRET,
                signOptions: { expiresIn: `${ApiServerConfig_1.ApiServerConfig.ACCESS_TOKEN_TTL_IN_MINUTES}m` },
            }),
            UserModule_1.UserModule,
        ],
        providers: [
            HttpAuthService_1.HttpAuthService,
            HttpLocalStrategy_1.HttpLocalStrategy,
            HttpJwtStrategy_1.HttpJwtStrategy
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=AuthModule.js.map