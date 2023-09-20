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
exports.HttpRestApiResponseCourse = void 0;
const HttpRestApiResponse_1 = require("@application/api/http-rest/controller/documentation/common/HttpRestApiResponse");
const HttpRestApiModelCourse_1 = require("@application/api/http-rest/controller/documentation/course/HttpRestApiModelCourse");
const swagger_1 = require("@nestjs/swagger");
class HttpRestApiResponseCourse extends HttpRestApiResponse_1.HttpRestApiResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: HttpRestApiModelCourse_1.HttpRestApiModelCourse }),
    __metadata("design:type", HttpRestApiModelCourse_1.HttpRestApiModelCourse)
], HttpRestApiResponseCourse.prototype, "data", void 0);
exports.HttpRestApiResponseCourse = HttpRestApiResponseCourse;
//# sourceMappingURL=HttpRestApiResponseCourse.js.map