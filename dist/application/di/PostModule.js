"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const PostController_1 = require("@application/api/http-rest/controller/PostController");
const CoreDITokens_1 = require("@core/common/di/CoreDITokens");
const PostDITokens_1 = require("@core/domain/post/di/PostDITokens");
const HandlePostImageRemovedEventService_1 = require("@core/service/post/handler/HandlePostImageRemovedEventService");
const CreatePostService_1 = require("@core/service/post/usecase/CreatePostService");
const EditPostService_1 = require("@core/service/post/usecase/EditPostService");
const GetPostListService_1 = require("@core/service/post/usecase/GetPostListService");
const GetPostService_1 = require("@core/service/post/usecase/GetPostService");
const PublishPostService_1 = require("@core/service/post/usecase/PublishPostService");
const RemovePostService_1 = require("@core/service/post/usecase/RemovePostService");
const TypeOrmPostRepositoryAdapter_1 = require("@infrastructure/adapter/persistence/typeorm/repository/post/TypeOrmPostRepositoryAdapter");
const NestWrapperPostImageRemovedEventHandler_1 = require("@infrastructure/handler/post/NestWrapperPostImageRemovedEventHandler");
const TransactionalUseCaseWrapper_1 = require("@infrastructure/transaction/TransactionalUseCaseWrapper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const persistenceProviders = [
    {
        provide: PostDITokens_1.PostDITokens.PostRepository,
        useFactory: connection => connection.getCustomRepository(TypeOrmPostRepositoryAdapter_1.TypeOrmPostRepositoryAdapter),
        inject: [typeorm_1.Connection]
    }
];
const useCaseProviders = [
    {
        provide: PostDITokens_1.PostDITokens.CreatePostUseCase,
        useFactory: (postRepository, queryBus) => {
            const service = new CreatePostService_1.CreatePostService(postRepository, queryBus);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [PostDITokens_1.PostDITokens.PostRepository, CoreDITokens_1.CoreDITokens.QueryBus]
    },
    {
        provide: PostDITokens_1.PostDITokens.EditPostUseCase,
        useFactory: (postRepository, queryBus) => {
            const service = new EditPostService_1.EditPostService(postRepository, queryBus);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [PostDITokens_1.PostDITokens.PostRepository, CoreDITokens_1.CoreDITokens.QueryBus]
    },
    {
        provide: PostDITokens_1.PostDITokens.GetPostListUseCase,
        useFactory: (postRepository) => new GetPostListService_1.GetPostListService(postRepository),
        inject: [PostDITokens_1.PostDITokens.PostRepository]
    },
    {
        provide: PostDITokens_1.PostDITokens.GetPostUseCase,
        useFactory: (postRepository) => new GetPostService_1.GetPostService(postRepository),
        inject: [PostDITokens_1.PostDITokens.PostRepository]
    },
    {
        provide: PostDITokens_1.PostDITokens.PublishPostUseCase,
        useFactory: (postRepository) => {
            const service = new PublishPostService_1.PublishPostService(postRepository);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [PostDITokens_1.PostDITokens.PostRepository]
    },
    {
        provide: PostDITokens_1.PostDITokens.RemovePostUseCase,
        useFactory: (postRepository) => {
            const service = new RemovePostService_1.RemovePostService(postRepository);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [PostDITokens_1.PostDITokens.PostRepository]
    },
];
const handlerProviders = [
    {
        provide: NestWrapperPostImageRemovedEventHandler_1.NestWrapperPostImageRemovedEventHandler,
        useClass: NestWrapperPostImageRemovedEventHandler_1.NestWrapperPostImageRemovedEventHandler,
    },
    {
        provide: PostDITokens_1.PostDITokens.PostImageRemovedEventHandler,
        useFactory: (postRepository) => new HandlePostImageRemovedEventService_1.HandlePostImageRemovedEventService(postRepository),
        inject: [PostDITokens_1.PostDITokens.PostRepository]
    }
];
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            PostController_1.PostController
        ],
        providers: [
            ...persistenceProviders,
            ...useCaseProviders,
            ...handlerProviders,
        ]
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=PostModule.js.map