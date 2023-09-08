"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovePostService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
class RemovePostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(payload) {
        const post = CoreAssert_1.CoreAssert.notEmpty(await this.postRepository.findPost({ id: payload.postId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post not found.' }));
        const hasAccess = payload.executorId === post.getOwner().getId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        await this.postRepository.removePost(post);
    }
}
exports.RemovePostService = RemovePostService;
//# sourceMappingURL=RemovePostService.js.map