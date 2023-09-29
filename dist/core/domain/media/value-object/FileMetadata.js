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
exports.FileMetadata = void 0;
const ValueObject_1 = require("@core/common/value-object/ValueObject");
const class_validator_1 = require("class-validator");
class FileMetadata extends ValueObject_1.ValueObject {
    constructor(payload) {
        super();
        this.relativePath = payload.relativePath;
        this.size = payload.size || null;
        this.ext = payload.ext || null;
        this.mimetype = payload.mimetype || null;
    }
    static async new(payload) {
        const fileMetadata = new FileMetadata(payload);
        return fileMetadata;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileMetadata.prototype, "relativePath", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], FileMetadata.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], FileMetadata.prototype, "ext", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], FileMetadata.prototype, "mimetype", void 0);
exports.FileMetadata = FileMetadata;
//# sourceMappingURL=FileMetadata.js.map