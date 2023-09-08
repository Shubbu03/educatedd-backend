"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const NestHttpExceptionFilter_1 = require("@application/api/http-rest/exception-filter/NestHttpExceptionFilter");
const NestHttpLoggingInterceptor_1 = require("@application/api/http-rest/interceptor/NestHttpLoggingInterceptor");
const CoreDITokens_1 = require("@core/common/di/CoreDITokens");
const NestCommandBusAdapter_1 = require("@infrastructure/adapter/message/NestCommandBusAdapter");
const NestEventBusAdapter_1 = require("@infrastructure/adapter/message/NestEventBusAdapter");
const NestQueryBusAdapter_1 = require("@infrastructure/adapter/message/NestQueryBusAdapter");
const TypeOrmLogger_1 = require("@infrastructure/adapter/persistence/typeorm/logger/TypeOrmLogger");
const TypeOrmDirectory_1 = require("@infrastructure/adapter/persistence/typeorm/TypeOrmDirectory");
const ApiServerConfig_1 = require("@infrastructure/config/ApiServerConfig");
const DatabaseConfig_1 = require("@infrastructure/config/DatabaseConfig");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const providers = [
    {
        provide: core_1.APP_FILTER,
        useClass: NestHttpExceptionFilter_1.NestHttpExceptionFilter,
    },
    {
        provide: CoreDITokens_1.CoreDITokens.CommandBus,
        useClass: NestCommandBusAdapter_1.NestCommandBusAdapter,
    },
    {
        provide: CoreDITokens_1.CoreDITokens.QueryBus,
        useClass: NestQueryBusAdapter_1.NestQueryBusAdapter,
    },
    {
        provide: CoreDITokens_1.CoreDITokens.EventBus,
        useClass: NestEventBusAdapter_1.NestEventBusAdapter,
    }
];
if (ApiServerConfig_1.ApiServerConfig.LOG_ENABLE) {
    providers.push({
        provide: core_1.APP_INTERCEPTOR,
        useClass: NestHttpLoggingInterceptor_1.NestHttpLoggingInterceptor,
    });
}
let InfrastructureModule = class InfrastructureModule {
    onApplicationBootstrap() {
        (0, typeorm_transactional_cls_hooked_1.initializeTransactionalContext)();
    }
};
InfrastructureModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'postgres',
                host: DatabaseConfig_1.DatabaseConfig.DB_HOST,
                port: DatabaseConfig_1.DatabaseConfig.DB_PORT,
                username: DatabaseConfig_1.DatabaseConfig.DB_USERNAME,
                password: DatabaseConfig_1.DatabaseConfig.DB_PASSWORD,
                database: DatabaseConfig_1.DatabaseConfig.DB_NAME,
                logging: DatabaseConfig_1.DatabaseConfig.DB_LOG_ENABLE ? 'all' : false,
                logger: DatabaseConfig_1.DatabaseConfig.DB_LOG_ENABLE ? TypeOrmLogger_1.TypeOrmLogger.new() : undefined,
                entities: [`${TypeOrmDirectory_1.TypeOrmDirectory}/entity/**/*{.ts,.js}`],
                migrationsRun: true,
                migrations: [`${TypeOrmDirectory_1.TypeOrmDirectory}/migration/**/*{.ts,.js}`],
                migrationsTransactionMode: 'all',
            })
        ],
        providers: providers,
        exports: [
            CoreDITokens_1.CoreDITokens.CommandBus,
            CoreDITokens_1.CoreDITokens.QueryBus,
            CoreDITokens_1.CoreDITokens.EventBus,
        ]
    })
], InfrastructureModule);
exports.InfrastructureModule = InfrastructureModule;
//# sourceMappingURL=InfrastructureModule.js.map