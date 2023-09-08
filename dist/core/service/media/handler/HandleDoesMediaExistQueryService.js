"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleDoesMediaExistQueryService = void 0;
const DoesMediaExistQueryResult_1 = require("@core/common/message/query/queries/media/result/DoesMediaExistQueryResult");
class HandleDoesMediaExistQueryService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async handle(query) {
        const count = await this.mediaRepository.countMedias(query.by);
        return DoesMediaExistQueryResult_1.DoesMediaExistQueryResult.new(!!count);
    }
}
exports.HandleDoesMediaExistQueryService = HandleDoesMediaExistQueryService;
//# sourceMappingURL=HandleDoesMediaExistQueryService.js.map