"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const UserController_1 = require("@application/api/http-rest/controller/UserController");
const UserDITokens_1 = require("@core/domain/user/di/UserDITokens");
const HandleGetUserPreviewQueryService_1 = require("@core/service/user/handler/HandleGetUserPreviewQueryService");
const CreateUserService_1 = require("@core/service/user/usecase/CreateUserService");
const GetUserService_1 = require("@core/service/user/usecase/GetUserService");
const EditUserService_1 = require("@core/service/user/usecase/EditUserService");
const TypeOrmUserRepositoryAdapter_1 = require("@infrastructure/adapter/persistence/typeorm/repository/user/TypeOrmUserRepositoryAdapter");
const NestWrapperGetUserPreviewQueryHandler_1 = require("@infrastructure/handler/user/NestWrapperGetUserPreviewQueryHandler");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const persistenceProviders = [
    {
        provide: UserDITokens_1.UserDITokens.UserRepository,
        useFactory: connection => connection.getCustomRepository(TypeOrmUserRepositoryAdapter_1.TypeOrmUserRepositoryAdapter),
        inject: [typeorm_1.Connection]
    }
];
const useCaseProviders = [
    {
        provide: UserDITokens_1.UserDITokens.CreateUserUseCase,
        useFactory: (userRepository) => new CreateUserService_1.CreateUserService(userRepository),
        inject: [UserDITokens_1.UserDITokens.UserRepository]
    },
    {
        provide: UserDITokens_1.UserDITokens.GetUserUseCase,
        useFactory: (userRepository) => new GetUserService_1.GetUserService(userRepository),
        inject: [UserDITokens_1.UserDITokens.UserRepository]
    },
    {
        provide: UserDITokens_1.UserDITokens.EditUserUseCase,
        useFactory: (userRepository) => new EditUserService_1.EditUserService(userRepository),
        inject: [UserDITokens_1.UserDITokens.UserRepository]
    },
];
const handlerProviders = [
    NestWrapperGetUserPreviewQueryHandler_1.NestWrapperGetUserPreviewQueryHandler,
    {
        provide: UserDITokens_1.UserDITokens.GetUserPreviewQueryHandler,
        useFactory: (userRepository) => new HandleGetUserPreviewQueryService_1.HandleGetUserPreviewQueryService(userRepository),
        inject: [UserDITokens_1.UserDITokens.UserRepository]
    }
];
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            UserController_1.UserController
        ],
        providers: [
            ...persistenceProviders,
            ...useCaseProviders,
            ...handlerProviders,
        ],
        exports: [
            UserDITokens_1.UserDITokens.UserRepository
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=UserModule.js.map