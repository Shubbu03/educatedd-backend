"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootModule = void 0;
const AuthModule_1 = require("@application/di/AuthModule");
const InfrastructureModule_1 = require("@application/di/InfrastructureModule");
const CourseModule_1 = require("./CourseModule");
const UserModule_1 = require("@application/di/UserModule");
const common_1 = require("@nestjs/common");
let RootModule = class RootModule {
};
RootModule = __decorate([
    (0, common_1.Module)({
        imports: [
            InfrastructureModule_1.InfrastructureModule,
            AuthModule_1.AuthModule,
            UserModule_1.UserModule,
            CourseModule_1.CourseModule,
        ]
    })
], RootModule);
exports.RootModule = RootModule;
//# sourceMappingURL=.RootModule.js.map