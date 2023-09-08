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
exports.PostImage = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const class_validator_1 = require("class-validator");
class PostImage extends Entity_1.Entity {
    constructor(id, relativePath) {
        super();
        this.id = id;
        this.relativePath = relativePath;
    }
    getRelativePath() {
        return this.relativePath;
    }
    static async new(id, relativePath) {
        const postImage = new PostImage(id, relativePath);
        await postImage.validate();
        return postImage;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostImage.prototype, "relativePath", void 0);
exports.PostImage = PostImage;
//# sourceMappingURL=PostImage.js.map