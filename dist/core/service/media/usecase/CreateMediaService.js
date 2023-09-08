"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaService = void 0;
const Media_1 = require("@core/domain/media/entity/Media");
const MediaUseCaseDto_1 = require("@core/domain/media/usecase/dto/MediaUseCaseDto");
class CreateMediaService {
    constructor(mediaRepository, mediaFileStorage) {
        this.mediaRepository = mediaRepository;
        this.mediaFileStorage = mediaFileStorage;
    }
    async execute(payload) {
        const fileMetaData = await this.mediaFileStorage.upload(payload.file, { type: payload.type });
        const media = await Media_1.Media.new({
            ownerId: payload.executorId,
            name: payload.name,
            type: payload.type,
            metadata: fileMetaData,
        });
        await this.mediaRepository.addMedia(media);
        return MediaUseCaseDto_1.MediaUseCaseDto.newFromMedia(media);
    }
}
exports.CreateMediaService = CreateMediaService;
//# sourceMappingURL=CreateMediaService.js.map