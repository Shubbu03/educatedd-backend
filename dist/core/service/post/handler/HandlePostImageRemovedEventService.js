"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlePostImageRemovedEventService = void 0;
const MediaEnums_1 = require("@core/common/enums/MediaEnums");
class HandlePostImageRemovedEventService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async handle(event) {
        if (event.type === MediaEnums_1.MediaType.IMAGE) {
            await this.postRepository.updatePosts({ imageId: null }, { imageId: event.mediaId });
        }
    }
}
exports.HandlePostImageRemovedEventService = HandlePostImageRemovedEventService;
//# sourceMappingURL=HandlePostImageRemovedEventService.js.map