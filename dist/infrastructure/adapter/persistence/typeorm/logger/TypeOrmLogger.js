"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmLogger = void 0;
const common_1 = require("@nestjs/common");
class TypeOrmLogger {
    log(level, message) {
        common_1.Logger.log(message, TypeOrmLogger.name);
    }
    logMigration(message) {
        common_1.Logger.log(message, TypeOrmLogger.name);
    }
    logQuery(query, parameters) {
        let message = `Query: ${query} `;
        if (parameters) {
            message = `${message} Parameters: ${JSON.stringify(parameters)}`;
        }
        common_1.Logger.log(message, TypeOrmLogger.name);
    }
    logQueryError(error, query, parameters) {
        let message = `Query: ${query} `;
        if (parameters) {
            message = `${message} Parameters: ${JSON.stringify(parameters)}`;
        }
        common_1.Logger.error(message, error, TypeOrmLogger.name);
    }
    logQuerySlow(time, query, parameters) {
        let message = `Query: ${query} Time: ${time}`;
        if (parameters) {
            message = `${message} Parameters: ${JSON.stringify(parameters)}`;
        }
        common_1.Logger.log(message, TypeOrmLogger.name);
    }
    logSchemaBuild(message) {
        common_1.Logger.log(message, TypeOrmLogger.name);
    }
    static new() {
        return new TypeOrmLogger();
    }
}
exports.TypeOrmLogger = TypeOrmLogger;
//# sourceMappingURL=TypeOrmLogger.js.map