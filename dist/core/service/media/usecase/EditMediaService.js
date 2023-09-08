"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMediaService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const MediaUseCaseDto_1 = require("@core/domain/media/usecase/dto/MediaUseCaseDto");
class EditMediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async execute(payload) {
        const media = CoreAssert_1.CoreAssert.notEmpty(await this.mediaRepository.findMedia({ id: payload.mediaId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Media not found.' }));
        const hasAccess = payload.executorId === media.getOwnerId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        await media.edit({ name: payload.name });
        await this.mediaRepository.updateMedia(media);
        return MediaUseCaseDto_1.MediaUseCaseDto.newFromMedia(media);
    }
}
exports.EditMediaService = EditMediaService;
//# sourceMappingURL=EditMediaService.js.map