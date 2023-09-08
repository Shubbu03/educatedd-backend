"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const env_var_1 = require("env-var");
class DatabaseConfig {
}
exports.DatabaseConfig = DatabaseConfig;
DatabaseConfig.DB_HOST = (0, env_var_1.get)('DB_HOST').required().asString();
DatabaseConfig.DB_PORT = (0, env_var_1.get)('DB_PORT').required().asPortNumber();
DatabaseConfig.DB_USERNAME = (0, env_var_1.get)('DB_USERNAME').required().asString();
DatabaseConfig.DB_PASSWORD = (0, env_var_1.get)('DB_PASSWORD').required().asString();
DatabaseConfig.DB_NAME = (0, env_var_1.get)('DB_NAME').required().asString();
DatabaseConfig.DB_LOG_ENABLE = (0, env_var_1.get)('DB_LOG_ENABLE').required().asBool();
//# sourceMappingURL=DatabaseConfig.js.map