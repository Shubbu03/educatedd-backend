"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const MediaUseCaseDto_1 = require("@core/domain/media/usecase/dto/MediaUseCaseDto");
class GetMediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async execute(payload) {
        const media = CoreAssert_1.CoreAssert.notEmpty(await this.mediaRepository.findMedia({ id: payload.mediaId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Media not found.' }));
        const hasAccess = payload.executorId === media.getOwnerId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        return MediaUseCaseDto_1.MediaUseCaseDto.newFromMedia(media);
    }
}
exports.GetMediaService = GetMediaService;
//# sourceMappingURL=GetMediaService.js.map