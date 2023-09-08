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
exports.HttpRestApiResponseMedia = void 0;
const HttpRestApiResponse_1 = require("@application/api/http-rest/controller/documentation/common/HttpRestApiResponse");
const HttpRestApiModelMedia_1 = require("@application/api/http-rest/controller/documentation/media/HttpRestApiModelMedia");
const swagger_1 = require("@nestjs/swagger");
class HttpRestApiResponseMedia extends HttpRestApiResponse_1.HttpRestApiResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: HttpRestApiModelMedia_1.HttpRestApiModelMedia }),
    __metadata("design:type", HttpRestApiModelMedia_1.HttpRestApiModelMedia)
], HttpRestApiResponseMedia.prototype, "data", void 0);
exports.HttpRestApiResponseMedia = HttpRestApiResponseMedia;
//# sourceMappingURL=HttpRestApiResponseMedia.js.map