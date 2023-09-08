"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmMediaMapper = void 0;
const Media_1 = require("@core/domain/media/entity/Media");
const FileMetadata_1 = require("@core/domain/media/value-object/FileMetadata");
const TypeOrmMedia_1 = require("@infrastructure/adapter/persistence/typeorm/entity/media/TypeOrmMedia");
class TypeOrmMediaMapper {
    static toOrmEntity(domainMedia) {
        const ormMedia = new TypeOrmMedia_1.TypeOrmMedia();
        ormMedia.id = domainMedia.getId();
        ormMedia.ownerId = domainMedia.getOwnerId();
        ormMedia.name = domainMedia.getName();
        ormMedia.type = domainMedia.getType();
        ormMedia.relativePath = domainMedia.getMetadata().relativePath;
        ormMedia.size = domainMedia.getMetadata().size;
        ormMedia.ext = domainMedia.getMetadata().ext;
        ormMedia.mimetype = domainMedia.getMetadata().mimetype;
        ormMedia.createdAt = domainMedia.getCreatedAt();
        ormMedia.editedAt = domainMedia.getEditedAt();
        ormMedia.removedAt = domainMedia.getRemovedAt();
        return ormMedia;
    }
    static toOrmEntities(domainMedias) {
        return domainMedias.map(domainMedia => this.toOrmEntity(domainMedia));
    }
    static toDomainEntity(ormMedia) {
        const metadata = new FileMetadata_1.FileMetadata({
            relativePath: ormMedia.relativePath,
            size: ormMedia.size,
            ext: ormMedia.ext,
            mimetype: ormMedia.mimetype,
        });
        const domainMedia = new Media_1.Media({
            ownerId: ormMedia.ownerId,
            name: ormMedia.name,
            type: ormMedia.type,
            metadata: metadata,
            id: ormMedia.id,
            createdAt: ormMedia.createdAt,
            editedAt: ormMedia.editedAt,
            removedAt: ormMedia.removedAt,
        });
        return domainMedia;
    }
    static toDomainEntities(ormMedias) {
        return ormMedias.map(ormMedia => this.toDomainEntity(ormMedia));
    }
}
exports.TypeOrmMediaMapper = TypeOrmMediaMapper;
//# sourceMappingURL=TypeOrmMediaMapper.js.map