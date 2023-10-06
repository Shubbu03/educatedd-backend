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
var GetEnrolledCourseListAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEnrolledCourseListAdapter = void 0;
const UseCaseValidatableAdapter_1 = require("@core/common/adapter/usecase/UseCaseValidatableAdapter");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let GetEnrolledCourseListAdapter = GetEnrolledCourseListAdapter_1 = class GetEnrolledCourseListAdapter extends UseCaseValidatableAdapter_1.UseCaseValidatableAdapter {
    static async new(payload) {
        const adapter = (0, class_transformer_1.plainToClass)(GetEnrolledCourseListAdapter_1, payload);
        await adapter.validate();
        console.log("Entered the get enrolled course adapter with payload::::", adapter, payload);
        return adapter;
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetEnrolledCourseListAdapter.prototype, "executorId", void 0);
GetEnrolledCourseListAdapter = GetEnrolledCourseListAdapter_1 = __decorate([
    (0, class_transformer_1.Exclude)()
], GetEnrolledCourseListAdapter);
exports.GetEnrolledCourseListAdapter = GetEnrolledCourseListAdapter;
//# sourceMappingURL=GetEnrolledCourseListAdapter.js.map