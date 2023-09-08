"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveMediaService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const MediaRemovedEvent_1 = require("@core/common/message/event/events/media/MediaRemovedEvent");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
class RemoveMediaService {
    constructor(mediaRepository, eventBus) {
        this.mediaRepository = mediaRepository;
        this.eventBus = eventBus;
    }
    async execute(payload) {
        const media = CoreAssert_1.CoreAssert.notEmpty(await this.mediaRepository.findMedia({ id: payload.mediaId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Media not found.' }));
        const hasAccess = payload.executorId === media.getOwnerId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        await this.mediaRepository.removeMedia(media);
        await this.eventBus.sendEvent(MediaRemovedEvent_1.MediaRemovedEvent.new(media.getId(), media.getOwnerId(), media.getType()));
    }
}
exports.RemoveMediaService = RemoveMediaService;
//# sourceMappingURL=RemoveMediaService.js.map