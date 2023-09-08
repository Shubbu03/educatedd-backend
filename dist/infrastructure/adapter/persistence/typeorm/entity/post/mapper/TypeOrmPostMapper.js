"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmPostMapper = void 0;
const Post_1 = require("@core/domain/post/entity/Post");
const PostImage_1 = require("@core/domain/post/entity/PostImage");
const PostOwner_1 = require("@core/domain/post/entity/PostOwner");
const TypeOrmPost_1 = require("@infrastructure/adapter/persistence/typeorm/entity/post/TypeOrmPost");
class TypeOrmPostMapper {
    static toOrmEntity(domainPost) {
        const ormPost = new TypeOrmPost_1.TypeOrmPost();
        const image = domainPost.getImage();
        ormPost.id = domainPost.getId();
        ormPost.ownerId = domainPost.getOwner().getId();
        ormPost.title = domainPost.getTitle();
        ormPost.imageId = image ? image.getId() : null;
        ormPost.content = domainPost.getContent();
        ormPost.status = domainPost.getStatus();
        ormPost.createdAt = domainPost.getCreatedAt();
        ormPost.editedAt = domainPost.getEditedAt();
        ormPost.publishedAt = domainPost.getPublishedAt();
        ormPost.removedAt = domainPost.getRemovedAt();
        return ormPost;
    }
    static toOrmEntities(domainPosts) {
        return domainPosts.map(domainPost => this.toOrmEntity(domainPost));
    }
    static toDomainEntity(ormPost) {
        const domainPost = new Post_1.Post({
            owner: new PostOwner_1.PostOwner(ormPost.owner.id, `${ormPost.owner.firstName} ${ormPost.owner.lastName}`, ormPost.owner.role),
            title: ormPost.title,
            image: ormPost.image ? new PostImage_1.PostImage(ormPost.image.id, ormPost.image.relativePath) : null,
            content: ormPost.content,
            id: ormPost.id,
            status: ormPost.status,
            createdAt: ormPost.createdAt,
            editedAt: ormPost.editedAt,
            publishedAt: ormPost.publishedAt,
            removedAt: ormPost.removedAt,
        });
        return domainPost;
    }
    static toDomainEntities(ormPosts) {
        return ormPosts.map(ormPost => this.toDomainEntity(ormPost));
    }
}
exports.TypeOrmPostMapper = TypeOrmPostMapper;
//# sourceMappingURL=TypeOrmPostMapper.js.map