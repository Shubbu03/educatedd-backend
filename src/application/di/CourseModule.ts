import { CourseController } from '@application/api/http-rest/controller/CourseController';
import { CoreDITokens } from '@core/common/di/CoreDITokens';
import { CourseDITokens } from '@core/domain/course/di/CourseDITokens';
import { UploadFileUseCase } from '@core/domain/course/usecase/UploadFileUseCase';
import { CreateCourseUseCase } from '@core/domain/course/usecase/CreateCourseUseCase';
import { EditCourseUseCase } from '@core/domain/course/usecase/EditCourseUseCase';
import { RemoveCourseUseCase } from '@core/domain/course/usecase/RemoveCourseUseCase';
import { HandleDoesCourseExistQueryService } from '@core/service/course/handler/HandleDoesCourseExistQueryService';
import { HandleGetCoursePreviewQueryService } from '@core/service/course/handler/HandleGetCoursePreviewQueryService';
import { CreateCourseService } from '@core/service/course/usecase/CreateCourseService';
import { EditCourseService } from '@core/service/course/usecase/EditCourseService';
import { GetCourseListService } from '@core/service/course/usecase/GetCourseListService';
import { GetCourseService } from '@core/service/course/usecase/GetCourseService';
import { RemoveCourseService } from '@core/service/course/usecase/RemoveCourseService';
import { MinioCourseFileStorageAdapter } from '@infrastructure/adapter/persistence/media-file/MinioCourseFileStorageAdapter';
import { TypeOrmCourseRepositoryAdapter, TypeOrmEnrolledCourseRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/course/TypeOrmCourseRepositoryAdapter';
import { NestWrapperDoesCourseExistQueryHandler } from '@infrastructure/handler/course/NestWrapperDoesCourseExistQueryHandler';
import { NestWrapperGetCoursePreviewQueryHandler } from '@infrastructure/handler/course/NestWrapperGetCoursePreviewQueryHandler';
import { TransactionalUseCaseWrapper } from '@infrastructure/transaction/TransactionalUseCaseWrapper';
import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Connection } from 'typeorm';
import { UploadCourseService } from '@core/service/course/usecase/UploadCourseService';
import { NewUploadFileUseCase } from '@core/domain/course/usecase/NewUploadFileUseCase';
import { EnrolledCourseUseCase } from '@core/domain/course/usecase/EnrolledCourseUseCase';
import { EnrolledCourseService } from '@core/service/course/usecase/EnrolledCourseService';
import { GetEnrolledCourseListService } from '@core/service/course/usecase/GetEnrolledCourseListService';

const persistenceProviders: Provider[] = [
    {
      provide : CourseDITokens.CourseFileStorage,
      useClass: MinioCourseFileStorageAdapter,
    },
    {
      provide   : CourseDITokens.CourseRepository,
      useFactory: connection => connection.getCustomRepository(TypeOrmCourseRepositoryAdapter,TypeOrmEnrolledCourseRepositoryAdapter),
      inject    : [Connection]
    }
  ];

  const useCaseProviders: Provider[] = [
    {
      provide   : CourseDITokens.CreateCourseUseCase,
      useFactory: (courseRepository, courseFileStorage) => {
        const service: CreateCourseUseCase = new CreateCourseService(courseRepository, courseFileStorage);
        return new TransactionalUseCaseWrapper(service);
      },
      inject    : [CourseDITokens.CourseRepository, CourseDITokens.CourseFileStorage]
    },
    {
      provide   : CourseDITokens.EnrolledCourseUseCase,
      useFactory: (enrolledCourseRepository) => {
        const service: EnrolledCourseUseCase = new EnrolledCourseService(enrolledCourseRepository);
        return new TransactionalUseCaseWrapper(service);
      },
      inject    : [CourseDITokens.CourseRepository, CourseDITokens.CourseFileStorage]
    },
    {
      provide   : CourseDITokens.UploadFileUseCase,
      useFactory: (courseRepository, fileRepository,courseFileStorage) => {
        const service: NewUploadFileUseCase = new UploadCourseService(courseRepository,fileRepository, courseFileStorage);
        return new TransactionalUseCaseWrapper(service);
      },
      inject    : [CourseDITokens.CourseRepository, CourseDITokens.CourseFileStorage]
    },
    {
      provide   : CourseDITokens.EditCourseUseCase,
      useFactory: (courseRepository) => {
        const service: EditCourseUseCase = new EditCourseService(courseRepository);
        return new TransactionalUseCaseWrapper(service);
        
      },
      inject    : [CourseDITokens.CourseRepository]
    },
    {
      provide   : CourseDITokens.GetCourseListUseCase,
      useFactory: (courseRepository) => new GetCourseListService(courseRepository),
      inject    : [CourseDITokens.CourseRepository]
    },
    {
      provide   : CourseDITokens.GetEnrolledCourseListUseCase,
      useFactory: (enrolledCourseListRepository) => new GetEnrolledCourseListService(enrolledCourseListRepository),
      inject    : [CourseDITokens.CourseRepository]
    },
    {
      provide   : CourseDITokens.GetCourseUseCase,
      useFactory: (courseRepository) => new GetCourseService(courseRepository),
      inject    : [CourseDITokens.CourseRepository]
    },
    {
      provide   : CourseDITokens.RemoveCourseUseCase,
      useFactory: (courseRepository, eventBus) => {
        const service: RemoveCourseUseCase = new RemoveCourseService(courseRepository, eventBus);
        return new TransactionalUseCaseWrapper(service);
      },
      inject    : [CourseDITokens.CourseRepository, CoreDITokens.EventBus]
    },
  ];

const handlerProviders: Provider[] = [
    NestWrapperDoesCourseExistQueryHandler,
    NestWrapperGetCoursePreviewQueryHandler,
    {
      provide   : CourseDITokens.DoesCourseExistQueryHandler,
      useFactory: (courseRepository) => new HandleDoesCourseExistQueryService(courseRepository),
      inject    : [CourseDITokens.CourseRepository]
    },
    {
      provide   : CourseDITokens.GetCoursePreviewQueryHandler,
      useFactory: (courseRepository) => new HandleGetCoursePreviewQueryService(courseRepository),
      inject    : [CourseDITokens.CourseRepository]
    }
  ];
  
  @Module({
    controllers: [
        CourseController
    ],
    providers: [
      ...persistenceProviders,
      ...useCaseProviders,
      ...handlerProviders,
    ]
  })
  export class CourseModule {}
   