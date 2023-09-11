"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageConfig = void 0;
const env_var_1 = require("env-var");
class FileStorageConfig {
}
exports.FileStorageConfig = FileStorageConfig;
FileStorageConfig.ENDPOINT = (0, env_var_1.get)('FILE_STORAGE_ENDPOINT').asString();
FileStorageConfig.PORT = (0, env_var_1.get)('FILE_STORAGE_PORT').asPortNumber();
FileStorageConfig.ACCESS_KEY = (0, env_var_1.get)('FILE_STORAGE_ACCESS_KEY').required().asString();
FileStorageConfig.SECRET_KEY = (0, env_var_1.get)('FILE_STORAGE_SECRET_KEY').required().asString();
FileStorageConfig.USE_SSL = (0, env_var_1.get)('FILE_STORAGE_USE_SSL').asBool() || false;
FileStorageConfig.BASE_PATH = (0, env_var_1.get)('FILE_STORAGE_BASE_PATH').required().asString();
FileStorageConfig.IMAGE_BUCKET = (0, env_var_1.get)('FILE_STORAGE_IMAGE_BUCKET').required().asString();
FileStorageConfig.IMAGE_EXT = (0, env_var_1.get)('FILE_STORAGE_IMAGE_EXT').required().asString();
FileStorageConfig.IMAGE_MIMETYPE = (0, env_var_1.get)('FILE_STORAGE_IMAGE_MIMETYPE').required().asString();
FileStorageConfig.PDF_BUCKET = (0, env_var_1.get)('FILE_STORAGE_PDF_BUCKET').required().asString();
FileStorageConfig.PDF_EXT = (0, env_var_1.get)('FILE_STORAGE_PDF_EXT').required().asString();
FileStorageConfig.PDF_MIMETYPE = (0, env_var_1.get)('FILE_STORAGE_PDF_MIMETYPE').required().asString();
//# sourceMappingURL=FileStorageConfig.js.map