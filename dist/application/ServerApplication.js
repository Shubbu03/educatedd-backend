"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApplication = void 0;
const _RootModule_1 = require("@application/di/.RootModule");
const ApiServerConfig_1 = require("@infrastructure/config/ApiServerConfig");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("@nestjs/swagger");
class ServerApplication {
    constructor() {
        this.host = ApiServerConfig_1.ApiServerConfig.HOST;
        this.port = ApiServerConfig_1.ApiServerConfig.PORT;
    }
    async run() {
        const app = await core_1.NestFactory.create(_RootModule_1.RootModule);
        app.use((0, cors_1.default)({
            origin: "*"
        }));
        this.buildAPIDocumentation(app);
        this.log();
        await app.listen(this.port, this.host);
    }
    buildAPIDocumentation(app) {
        const title = 'IPoster';
        const description = 'IPoster API documentation';
        const version = '1.0.0';
        const options = new swagger_1.DocumentBuilder()
            .setTitle(title)
            .setDescription(description)
            .setVersion(version)
            .addBearerAuth({ type: 'apiKey', in: 'header', name: ApiServerConfig_1.ApiServerConfig.ACCESS_TOKEN_HEADER })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('documentation', app, document);
    }
    log() {
        common_1.Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ServerApplication.name);
    }
    static new() {
        return new ServerApplication();
    }
}
exports.ServerApplication = ServerApplication;
//# sourceMappingURL=ServerApplication.js.map