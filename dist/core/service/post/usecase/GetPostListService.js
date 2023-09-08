"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostListService = void 0;
const PostUseCaseDto_1 = require("@core/domain/post/usecase/dto/PostUseCaseDto");
class GetPostListService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(payload) {
        const posts = await this.postRepository.findPosts({
            ownerId: payload.ownerId,
            status: payload.status,
        });
        return PostUseCaseDto_1.PostUseCaseDto.newListFromPosts(posts);
    }
}
exports.GetPostListService = GetPostListService;
//# sourceMappingURL=GetPostListService.js.map