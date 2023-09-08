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
var UserUseCaseDto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCaseDto = void 0;
const UserEnums_1 = require("@core/common/enums/UserEnums");
const class_transformer_1 = require("class-transformer");
let UserUseCaseDto = UserUseCaseDto_1 = class UserUseCaseDto {
    static newFromUser(user) {
        return (0, class_transformer_1.plainToClass)(UserUseCaseDto_1, user);
    }
    static newListFromUsers(users) {
        return users.map(user => this.newFromUser(user));
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserUseCaseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserUseCaseDto.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserUseCaseDto.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserUseCaseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserUseCaseDto.prototype, "role", void 0);
UserUseCaseDto = UserUseCaseDto_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], UserUseCaseDto);
exports.UserUseCaseDto = UserUseCaseDto;
//# sourceMappingURL=UserUseCaseDto.js.map