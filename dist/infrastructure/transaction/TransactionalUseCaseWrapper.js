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
exports.TransactionalUseCaseWrapper = void 0;
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
class TransactionalUseCaseWrapper {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async execute(port) {
        (0, typeorm_transactional_cls_hooked_1.runOnTransactionRollback)(async (error) => this.useCase.onRollback?.(error, port));
        console.log("port is:", port);
        const result = await this.useCase.execute(port);
        (0, typeorm_transactional_cls_hooked_1.runOnTransactionCommit)(async () => this.useCase.onCommit?.(result, port));
        console.log("result is:", result);
        return result;
    }
}
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionalUseCaseWrapper.prototype, "execute", null);
exports.TransactionalUseCaseWrapper = TransactionalUseCaseWrapper;
//# sourceMappingURL=TransactionalUseCaseWrapper.js.map