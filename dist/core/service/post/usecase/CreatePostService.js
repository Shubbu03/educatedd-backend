"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const GetMediaPreviewQuery_1 = require("@core/common/message/query/queries/media/GetMediaPreviewQuery");
const GetUserPreviewQuery_1 = require("@core/common/message/query/queries/user/GetUserPreviewQuery");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const Post_1 = require("@core/domain/post/entity/Post");
const PostImage_1 = require("@core/domain/post/entity/PostImage");
const PostOwner_1 = require("@core/domain/post/entity/PostOwner");
const PostUseCaseDto_1 = require("@core/domain/post/usecase/dto/PostUseCaseDto");
class CreatePostService {
    constructor(postRepository, queryBus) {
        this.postRepository = postRepository;
        this.queryBus = queryBus;
    }
    async execute(payload) {
        const postOwner = CoreAssert_1.CoreAssert.notEmpty(await this.queryBus.sendQuery(GetUserPreviewQuery_1.GetUserPreviewQuery.new({ id: payload.executorId })), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post owner not found.' }));
        const postImage = payload.imageId
            ? await this.queryBus.sendQuery(GetMediaPreviewQuery_1.GetMediaPreviewQuery.new({ id: payload.imageId, ownerId: payload.executorId }))
            : undefined;
        const imageNotFound = !!(!postImage && payload.imageId);
        CoreAssert_1.CoreAssert.isFalse(imageNotFound, Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post image not found.' }));
        const post = await Post_1.Post.new({
            owner: await PostOwner_1.PostOwner.new(postOwner.id, postOwner.name, postOwner.role),
            image: postImage ? await PostImage_1.PostImage.new(postImage.id, postImage.relativePath) : null,
            title: payload.title,
            content: payload.content,
        });
        await this.postRepository.addPost(post);
        return PostUseCaseDto_1.PostUseCaseDto.newFromPost(post);
    }
}
exports.CreatePostService = CreatePostService;
//# sourceMappingURL=CreatePostService.js.map