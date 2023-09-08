"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostService = void 0;
const Code_1 = require("@core/common/code/Code");
const PostEnums_1 = require("@core/common/enums/PostEnums");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const PostUseCaseDto_1 = require("@core/domain/post/usecase/dto/PostUseCaseDto");
class GetPostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(payload) {
        const post = CoreAssert_1.CoreAssert.notEmpty(await this.postRepository.findPost({ id: payload.postId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post not found.' }));
        const hasAccess = post.getStatus() === PostEnums_1.PostStatus.PUBLISHED
            || (payload.executorId === post.getOwner().getId() && post.getStatus() === PostEnums_1.PostStatus.DRAFT);
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        return PostUseCaseDto_1.PostUseCaseDto.newFromPost(post);
    }
}
exports.GetPostService = GetPostService;
//# sourceMappingURL=GetPostService.js.map