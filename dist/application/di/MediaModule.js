"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModule = void 0;
const MediaController_1 = require("@application/api/http-rest/controller/MediaController");
const CoreDITokens_1 = require("@core/common/di/CoreDITokens");
const MediaDITokens_1 = require("@core/domain/media/di/MediaDITokens");
const HandleDoesMediaExistQueryService_1 = require("@core/service/media/handler/HandleDoesMediaExistQueryService");
const HandleGetMediaPreviewQueryService_1 = require("@core/service/media/handler/HandleGetMediaPreviewQueryService");
const CreateMediaService_1 = require("@core/service/media/usecase/CreateMediaService");
const EditMediaService_1 = require("@core/service/media/usecase/EditMediaService");
const GetMediaListService_1 = require("@core/service/media/usecase/GetMediaListService");
const GetMediaService_1 = require("@core/service/media/usecase/GetMediaService");
const RemoveMediaService_1 = require("@core/service/media/usecase/RemoveMediaService");
const MinioMediaFileStorageAdapter_1 = require("@infrastructure/adapter/persistence/media-file/MinioMediaFileStorageAdapter");
const TypeOrmMediaRepositoryAdapter_1 = require("@infrastructure/adapter/persistence/typeorm/repository/media/TypeOrmMediaRepositoryAdapter");
const NestWrapperDoesMediaExistQueryHandler_1 = require("@infrastructure/handler/media/NestWrapperDoesMediaExistQueryHandler");
const NestWrapperGetMediaPreviewQueryHandler_1 = require("@infrastructure/handler/media/NestWrapperGetMediaPreviewQueryHandler");
const TransactionalUseCaseWrapper_1 = require("@infrastructure/transaction/TransactionalUseCaseWrapper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const persistenceProviders = [
    {
        provide: MediaDITokens_1.MediaDITokens.MediaFileStorage,
        useClass: MinioMediaFileStorageAdapter_1.MinioMediaFileStorageAdapter,
    },
    {
        provide: MediaDITokens_1.MediaDITokens.MediaRepository,
        useFactory: connection => connection.getCustomRepository(TypeOrmMediaRepositoryAdapter_1.TypeOrmMediaRepositoryAdapter),
        inject: [typeorm_1.Connection]
    }
];
const useCaseProviders = [
    {
        provide: MediaDITokens_1.MediaDITokens.CreateMediaUseCase,
        useFactory: (mediaRepository, mediaFileStorage) => {
            const service = new CreateMediaService_1.CreateMediaService(mediaRepository, mediaFileStorage);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository, MediaDITokens_1.MediaDITokens.MediaFileStorage]
    },
    {
        provide: MediaDITokens_1.MediaDITokens.EditMediaUseCase,
        useFactory: (mediaRepository) => {
            const service = new EditMediaService_1.EditMediaService(mediaRepository);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository]
    },
    {
        provide: MediaDITokens_1.MediaDITokens.GetMediaListUseCase,
        useFactory: (mediaRepository) => new GetMediaListService_1.GetMediaListService(mediaRepository),
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository]
    },
    {
        provide: MediaDITokens_1.MediaDITokens.GetMediaUseCase,
        useFactory: (mediaRepository) => new GetMediaService_1.GetMediaService(mediaRepository),
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository]
    },
    {
        provide: MediaDITokens_1.MediaDITokens.RemoveMediaUseCase,
        useFactory: (mediaRepository, eventBus) => {
            const service = new RemoveMediaService_1.RemoveMediaService(mediaRepository, eventBus);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository, CoreDITokens_1.CoreDITokens.EventBus]
    },
];
const handlerProviders = [
    NestWrapperDoesMediaExistQueryHandler_1.NestWrapperDoesMediaExistQueryHandler,
    NestWrapperGetMediaPreviewQueryHandler_1.NestWrapperGetMediaPreviewQueryHandler,
    {
        provide: MediaDITokens_1.MediaDITokens.DoesMediaExistQueryHandler,
        useFactory: (mediaRepository) => new HandleDoesMediaExistQueryService_1.HandleDoesMediaExistQueryService(mediaRepository),
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository]
    },
    {
        provide: MediaDITokens_1.MediaDITokens.GetMediaPreviewQueryHandler,
        useFactory: (mediaRepository) => new HandleGetMediaPreviewQueryService_1.HandleGetMediaPreviewQueryService(mediaRepository),
        inject: [MediaDITokens_1.MediaDITokens.MediaRepository]
    }
];
let MediaModule = class MediaModule {
};
MediaModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            MediaController_1.MediaController
        ],
        providers: [
            ...persistenceProviders,
            ...useCaseProviders,
            ...handlerProviders,
        ]
    })
], MediaModule);
exports.MediaModule = MediaModule;
//# sourceMappingURL=MediaModule.js.map