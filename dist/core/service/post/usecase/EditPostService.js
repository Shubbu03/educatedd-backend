"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPostService = void 0;
const Code_1 = require("@core/common/code/Code");
const GetMediaPreviewQuery_1 = require("@core/common/message/query/queries/media/GetMediaPreviewQuery");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const PostImage_1 = require("@core/domain/post/entity/PostImage");
const PostUseCaseDto_1 = require("@core/domain/post/usecase/dto/PostUseCaseDto");
class EditPostService {
    constructor(postRepository, queryBus) {
        this.postRepository = postRepository;
        this.queryBus = queryBus;
    }
    async execute(payload) {
        const post = CoreAssert_1.CoreAssert.notEmpty(await this.postRepository.findPost({ id: payload.postId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post not found.' }));
        const hasAccess = payload.executorId === post.getOwner().getId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        await post.edit({
            title: payload.title,
            image: await this.defineNewImage(payload, post),
            content: payload.content
        });
        await this.postRepository.updatePost(post);
        return PostUseCaseDto_1.PostUseCaseDto.newFromPost(post);
    }
    async defineNewImage(payload, post) {
        let newPostImage;
        const needUpdateImage = !!(payload.imageId && payload.imageId !== post.getImage()?.getId());
        const needResetImage = payload.imageId === null;
        if (needUpdateImage) {
            const query = GetMediaPreviewQuery_1.GetMediaPreviewQuery.new({ id: payload.imageId, ownerId: payload.executorId });
            const exception = Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post image not found.' });
            const postImage = CoreAssert_1.CoreAssert.notEmpty(await this.queryBus.sendQuery(query), exception);
            newPostImage = await PostImage_1.PostImage.new(postImage.id, postImage.relativePath);
        }
        if (needResetImage) {
            newPostImage = null;
        }
        return newPostImage;
    }
}
exports.EditPostService = EditPostService;
//# sourceMappingURL=EditPostService.js.map