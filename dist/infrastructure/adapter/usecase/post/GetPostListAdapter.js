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
var GetPostListAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostListAdapter = void 0;
const UseCaseValidatableAdapter_1 = require("@core/common/adapter/usecase/UseCaseValidatableAdapter");
const PostEnums_1 = require("@core/common/enums/PostEnums");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let GetPostListAdapter = GetPostListAdapter_1 = class GetPostListAdapter extends UseCaseValidatableAdapter_1.UseCaseValidatableAdapter {
    static async new(payload) {
        const adapter = (0, class_transformer_1.plainToClass)(GetPostListAdapter_1, payload);
        await adapter.validate();
        return adapter;
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetPostListAdapter.prototype, "executorId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetPostListAdapter.prototype, "ownerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PostEnums_1.PostStatus),
    __metadata("design:type", String)
], GetPostListAdapter.prototype, "status", void 0);
GetPostListAdapter = GetPostListAdapter_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], GetPostListAdapter);
exports.GetPostListAdapter = GetPostListAdapter;
//# sourceMappingURL=GetPostListAdapter.js.map