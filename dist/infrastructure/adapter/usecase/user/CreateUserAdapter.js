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
var CreateUserAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserAdapter = void 0;
const UseCaseValidatableAdapter_1 = require("@core/common/adapter/usecase/UseCaseValidatableAdapter");
const UserEnums_1 = require("@core/common/enums/UserEnums");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CreateUserAdapter = CreateUserAdapter_1 = class CreateUserAdapter extends UseCaseValidatableAdapter_1.UseCaseValidatableAdapter {
    static async new(payload) {
        const adapter = (0, class_transformer_1.plainToClass)(CreateUserAdapter_1, payload);
        await adapter.validate();
        return adapter;
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserAdapter.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserAdapter.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIn)([UserEnums_1.UserRole.AUTHOR, UserEnums_1.UserRole.GUEST]),
    __metadata("design:type", String)
], CreateUserAdapter.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserAdapter.prototype, "password", void 0);
CreateUserAdapter = CreateUserAdapter_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], CreateUserAdapter);
exports.CreateUserAdapter = CreateUserAdapter;
//# sourceMappingURL=CreateUserAdapter.js.map