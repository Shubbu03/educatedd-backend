"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServerConfig = void 0;
const env_var_1 = require("env-var");
class ApiServerConfig {
}
exports.ApiServerConfig = ApiServerConfig;
ApiServerConfig.HOST = (0, env_var_1.get)('API_HOST').required().asString();
ApiServerConfig.PORT = (0, env_var_1.get)('API_PORT').required().asPortNumber();
ApiServerConfig.ACCESS_TOKEN_SECRET = (0, env_var_1.get)('API_ACCESS_TOKEN_SECRET').required().asString();
ApiServerConfig.ACCESS_TOKEN_TTL_IN_MINUTES = (0, env_var_1.get)('API_ACCESS_TOKEN_TTL_IN_MINUTES').required().asInt();
ApiServerConfig.ACCESS_TOKEN_HEADER = (0, env_var_1.get)('API_ACCESS_TOKEN_HEADER').required().asString();
ApiServerConfig.LOGIN_USERNAME_FIELD = (0, env_var_1.get)('API_LOGIN_USERNAME_FIELD').required().asString();
ApiServerConfig.LOGIN_PASSWORD_FIELD = (0, env_var_1.get)('API_LOGIN_PASSWORD_FIELD').required().asString();
ApiServerConfig.LOG_ENABLE = (0, env_var_1.get)('API_LOG_ENABLE').required().asBool();
//# sourceMappingURL=ApiServerConfig.js.map