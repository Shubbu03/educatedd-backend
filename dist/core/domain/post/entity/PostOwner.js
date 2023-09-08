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
exports.PostOwner = void 0;
const Entity_1 = require("@core/common/entity/Entity");
const UserEnums_1 = require("@core/common/enums/UserEnums");
const class_validator_1 = require("class-validator");
class PostOwner extends Entity_1.Entity {
    constructor(id, name, role) {
        super();
        this.id = id;
        this.name = name;
        this.role = role;
    }
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }
    static async new(id, name, role) {
        const postOwner = new PostOwner(id, name, role);
        await postOwner.validate();
        return postOwner;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostOwner.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserEnums_1.UserRole),
    __metadata("design:type", String)
], PostOwner.prototype, "role", void 0);
exports.PostOwner = PostOwner;
//# sourceMappingURL=PostOwner.js.map