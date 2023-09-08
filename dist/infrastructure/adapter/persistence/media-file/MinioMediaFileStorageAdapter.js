"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioMediaFileStorageAdapter = void 0;
const MediaEnums_1 = require("@core/common/enums/MediaEnums");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const FileStorageConfig_1 = require("@infrastructure/config/FileStorageConfig");
const Minio = __importStar(require("minio"));
const uuid_1 = require("uuid");
class MinioMediaFileStorageAdapter {
    constructor() {
        this.client = new Minio.Client({
            endPoint: CoreAssert_1.CoreAssert.notEmpty(FileStorageConfig_1.FileStorageConfig.ENDPOINT, new Error('Minio: port not set')),
            port: FileStorageConfig_1.FileStorageConfig.PORT,
            accessKey: FileStorageConfig_1.FileStorageConfig.ACCESS_KEY,
            secretKey: FileStorageConfig_1.FileStorageConfig.SECRET_KEY,
            useSSL: FileStorageConfig_1.FileStorageConfig.USE_SSL
        });
    }
    async upload(uploadFile, options) {
        const uploadDetails = this.defineFileUploadDetails(options.type);
        const bucket = uploadDetails.bucket;
        const key = `${(0, uuid_1.v4)()}.${uploadDetails.ext}`;
        await this.client.putObject(bucket, key, uploadFile, { 'content-type': uploadDetails.mimitype });
        const fileStat = await this.client.statObject(bucket, key);
        const fileMetadata = await FileMetadata_1.FileMetadata.new({
            relativePath: `${bucket}/${key}`,
            size: fileStat.size,
            mimetype: fileStat.metaData['content-type'],
            ext: uploadDetails.ext
        });
        return fileMetadata;
    }
    defineFileUploadDetails(type) {
        const detailsRecord = {
            [MediaEnums_1.MediaType.IMAGE]: { bucket: FileStorageConfig_1.FileStorageConfig.IMAGE_BUCKET, ext: FileStorageConfig_1.FileStorageConfig.IMAGE_EXT, mimitype: FileStorageConfig_1.FileStorageConfig.IMAGE_MIMETYPE }
        };
        return CoreAssert_1.CoreAssert.notEmpty(detailsRecord[type], new Error('Minio: unknown media type'));
    }
}
exports.MinioMediaFileStorageAdapter = MinioMediaFileStorageAdapter;
//# sourceMappingURL=MinioMediaFileStorageAdapter.js.map