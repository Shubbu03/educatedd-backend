"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleGetMediaPreviewQueryService = void 0;
const GetMediaPreviewQueryResult_1 = require("@core/common/message/query/queries/media/result/GetMediaPreviewQueryResult");
class HandleGetMediaPreviewQueryService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        let queryResult;
        const media = await this.mediaRepository.findMedia(query.by);
        if (media) {
            queryResult = GetMediaPreviewQueryResult_1.GetMediaPreviewQueryResult.new(media.getId(), media.getType(), media.getMetadata().relativePath);
        }
        return queryResult;
    }
}
exports.HandleGetMediaPreviewQueryService = HandleGetMediaPreviewQueryService;
//# sourceMappingURL=HandleGetMediaPreviewQueryService.js.map