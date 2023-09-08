"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAuth = void 0;
const HttpJwtAuthGuard_1 = require("@application/api/http-rest/auth/guard/HttpJwtAuthGuard");
const HttpRoleAuthGuard_1 = require("@application/api/http-rest/auth/guard/HttpRoleAuthGuard");
const common_1 = require("@nestjs/common");
const HttpAuth = (...roles) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)(HttpJwtAuthGuard_1.HttpJwtAuthGuard, HttpRoleAuthGuard_1.HttpRoleAuthGuard));
};
exports.HttpAuth = HttpAuth;
//# sourceMappingURL=HttpAuth.js.map