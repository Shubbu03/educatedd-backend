"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRemovedEvent = void 0;
class MediaRemovedEvent {
    constructor(mediaId, ownerId, type) {
        this.mediaId = mediaId;
        this.ownerId = ownerId;
        this.type = type;
    }
    static new(mediaId, ownerId, type) {
        return new MediaRemovedEvent(mediaId, ownerId, type);
    }
}
exports.MediaRemovedEvent = MediaRemovedEvent;
//# sourceMappingURL=MediaRemovedEvent.js.map