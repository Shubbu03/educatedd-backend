"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleGetUserPreviewQueryService = void 0;
const GetUserPreviewQueryResult_1 = require("@core/common/message/query/queries/user/result/GetUserPreviewQueryResult");
class HandleGetUserPreviewQueryService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(query) {
        let queryResult;
        const user = await this.userRepository.findUser(query.by, query.options);
        if (user) {
            queryResult = GetUserPreviewQueryResult_1.GetUserPreviewQueryResult.new(user.getId(), user.getName(), user.getRole());
        }
        return queryResult;
    }
}
exports.HandleGetUserPreviewQueryService = HandleGetUserPreviewQueryService;
//# sourceMappingURL=HandleGetUserPreviewQueryService.js.map