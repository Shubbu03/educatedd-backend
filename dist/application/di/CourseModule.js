"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const CourseController_1 = require("@application/api/http-rest/controller/CourseController");
const CoreDITokens_1 = require("@core/common/di/CoreDITokens");
const CourseDITokens_1 = require("@core/domain/course/di/CourseDITokens");
const HandleDoesCourseExistQueryService_1 = require("@core/service/course/handler/HandleDoesCourseExistQueryService");
const HandleGetCoursePreviewQueryService_1 = require("@core/service/course/handler/HandleGetCoursePreviewQueryService");
const CreateCourseService_1 = require("@core/service/course/usecase/CreateCourseService");
const EditCourseService_1 = require("@core/service/course/usecase/EditCourseService");
const GetCourseListService_1 = require("@core/service/course/usecase/GetCourseListService");
const GetCourseService_1 = require("@core/service/course/usecase/GetCourseService");
const RemoveCourseService_1 = require("@core/service/course/usecase/RemoveCourseService");
const MinioCourseFileStorageAdapter_1 = require("@infrastructure/adapter/persistence/media-file/MinioCourseFileStorageAdapter");
const TypeOrmCourseRepositoryAdapter_1 = require("@infrastructure/adapter/persistence/typeorm/repository/course/TypeOrmCourseRepositoryAdapter");
const NestWrapperDoesCourseExistQueryHandler_1 = require("@infrastructure/handler/course/NestWrapperDoesCourseExistQueryHandler");
const NestWrapperGetCoursePreviewQueryHandler_1 = require("@infrastructure/handler/course/NestWrapperGetCoursePreviewQueryHandler");
const TransactionalUseCaseWrapper_1 = require("@infrastructure/transaction/TransactionalUseCaseWrapper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const UploadCourseService_1 = require("@core/service/course/usecase/UploadCourseService");
const EnrolledCourseService_1 = require("@core/service/course/usecase/EnrolledCourseService");
const GetEnrolledCourseListService_1 = require("@core/service/course/usecase/GetEnrolledCourseListService");
const persistenceProviders = [
    {
        provide: CourseDITokens_1.CourseDITokens.CourseFileStorage,
        useClass: MinioCourseFileStorageAdapter_1.MinioCourseFileStorageAdapter,
    },
    {
        provide: CourseDITokens_1.CourseDITokens.CourseRepository,
        useFactory: connection => connection.getCustomRepository(TypeOrmCourseRepositoryAdapter_1.TypeOrmCourseRepositoryAdapter, TypeOrmCourseRepositoryAdapter_1.TypeOrmEnrolledCourseRepositoryAdapter),
        inject: [typeorm_1.Connection]
    }
];
const useCaseProviders = [
    {
        provide: CourseDITokens_1.CourseDITokens.CreateCourseUseCase,
        useFactory: (courseRepository, courseFileStorage) => {
            const service = new CreateCourseService_1.CreateCourseService(courseRepository, courseFileStorage);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository, CourseDITokens_1.CourseDITokens.CourseFileStorage]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.EnrolledCourseUseCase,
        useFactory: (enrolledCourseRepository) => {
            const service = new EnrolledCourseService_1.EnrolledCourseService(enrolledCourseRepository);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository, CourseDITokens_1.CourseDITokens.CourseFileStorage]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.UploadFileUseCase,
        useFactory: (courseRepository, fileRepository, courseFileStorage) => {
            const service = new UploadCourseService_1.UploadCourseService(courseRepository, fileRepository, courseFileStorage);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository, CourseDITokens_1.CourseDITokens.CourseFileStorage]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.EditCourseUseCase,
        useFactory: (courseRepository) => {
            const service = new EditCourseService_1.EditCourseService(courseRepository);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.GetCourseListUseCase,
        useFactory: (courseRepository) => new GetCourseListService_1.GetCourseListService(courseRepository),
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.GetEnrolledCourseListUseCase,
        useFactory: (enrolledCourseListRepository) => new GetEnrolledCourseListService_1.GetEnrolledCourseListService(enrolledCourseListRepository),
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.GetCourseUseCase,
        useFactory: (courseRepository) => new GetCourseService_1.GetCourseService(courseRepository),
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.RemoveCourseUseCase,
        useFactory: (courseRepository, eventBus) => {
            const service = new RemoveCourseService_1.RemoveCourseService(courseRepository, eventBus);
            return new TransactionalUseCaseWrapper_1.TransactionalUseCaseWrapper(service);
        },
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository, CoreDITokens_1.CoreDITokens.EventBus]
    },
];
const handlerProviders = [
    NestWrapperDoesCourseExistQueryHandler_1.NestWrapperDoesCourseExistQueryHandler,
    NestWrapperGetCoursePreviewQueryHandler_1.NestWrapperGetCoursePreviewQueryHandler,
    {
        provide: CourseDITokens_1.CourseDITokens.DoesCourseExistQueryHandler,
        useFactory: (courseRepository) => new HandleDoesCourseExistQueryService_1.HandleDoesCourseExistQueryService(courseRepository),
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository]
    },
    {
        provide: CourseDITokens_1.CourseDITokens.GetCoursePreviewQueryHandler,
        useFactory: (courseRepository) => new HandleGetCoursePreviewQueryService_1.HandleGetCoursePreviewQueryService(courseRepository),
        inject: [CourseDITokens_1.CourseDITokens.CourseRepository]
    }
];
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            CourseController_1.CourseController
        ],
        providers: [
            ...persistenceProviders,
            ...useCaseProviders,
            ...handlerProviders,
        ]
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=CourseModule.js.map