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
exports.HttpAuthService = void 0;
const UserDITokens_1 = require("@core/domain/user/di/UserDITokens");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let HttpAuthService = class HttpAuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findUser({ email: username });
        if (user) {
            const isPasswordValid = await user.comparePassword(password);
            if (isPasswordValid) {
                return { id: user.getId(), email: user.getEmail(), role: user.getRole() };
            }
        }
        return null;
    }
    login(user) {
        const payload = { id: user.id };
        return {
            id: user.id,
            accessToken: this.jwtService.sign(payload),
            role: user.role
        };
    }
    async getUser(by) {
        return this.userRepository.findUser(by);
    }
};
HttpAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserDITokens_1.UserDITokens.UserRepository)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], HttpAuthService);
exports.HttpAuthService = HttpAuthService;
//# sourceMappingURL=HttpAuthService.js.map