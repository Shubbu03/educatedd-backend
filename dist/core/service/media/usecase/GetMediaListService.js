"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaListService = void 0;
const MediaUseCaseDto_1 = require("@core/domain/media/usecase/dto/MediaUseCaseDto");
class GetMediaListService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async execute(payload) {
        const medias = await this.mediaRepository.findMedias({ ownerId: payload.executorId });
        return MediaUseCaseDto_1.MediaUseCaseDto.newListFromMedias(medias);
    }
}
exports.GetMediaListService = GetMediaListService;
//# sourceMappingURL=GetMediaListService.js.map