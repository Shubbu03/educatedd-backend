"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmMediaRepositoryAdapter = void 0;
const TypeOrmMediaMapper_1 = require("@infrastructure/adapter/persistence/typeorm/entity/media/mapper/TypeOrmMediaMapper");
const TypeOrmMedia_1 = require("@infrastructure/adapter/persistence/typeorm/entity/media/TypeOrmMedia");
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
let TypeOrmMediaRepositoryAdapter = class TypeOrmMediaRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.mediaAlias = 'media';
        this.excludeRemovedMediaClause = `"${this.mediaAlias}"."removedAt" IS NULL`;
    }
    async findMedia(by, options = {}) {
        let domainEntity;
        const query = this.buildMediaQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedMediaClause);
        }
        const ormEntity = await query.getOne();
        if (ormEntity) {
            domainEntity = TypeOrmMediaMapper_1.TypeOrmMediaMapper.toDomainEntity(ormEntity);
        }
        return domainEntity;
    }
    async findMedias(by, options = {}) {
        const query = this.buildMediaQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedMediaClause);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        if (options.offset) {
            query.limit(options.offset);
        }
        const ormMedias = await query.getMany();
        const domainMedias = TypeOrmMediaMapper_1.TypeOrmMediaMapper.toDomainEntities(ormMedias);
        return domainMedias;
    }
    async countMedias(by, options = {}) {
        const query = this.buildMediaQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedMediaClause);
        }
        return query.getCount();
    }
    async addMedia(media) {
        const ormMedia = TypeOrmMediaMapper_1.TypeOrmMediaMapper.toOrmEntity(media);
        const insertResult = await this
            .createQueryBuilder(this.mediaAlias)
            .insert()
            .into(TypeOrmMedia_1.TypeOrmMedia)
            .values([ormMedia])
            .execute();
        return {
            id: insertResult.identifiers[0].id
        };
    }
    async updateMedia(media) {
        const ormMedia = TypeOrmMediaMapper_1.TypeOrmMediaMapper.toOrmEntity(media);
        await this.update(ormMedia.id, ormMedia);
    }
    async removeMedia(media, options = {}) {
        await media.remove();
        const ormMedia = TypeOrmMediaMapper_1.TypeOrmMediaMapper.toOrmEntity(media);
        if (options.disableSoftDeleting) {
            await this.delete(ormMedia);
        }
        if (!options.disableSoftDeleting) {
            await this.update(ormMedia.id, ormMedia);
        }
    }
    buildMediaQueryBuilder() {
        return this
            .createQueryBuilder(this.mediaAlias)
            .select();
    }
    extendQueryWithByProperties(by, query) {
        if (by.id) {
            query.andWhere(`"${this.mediaAlias}"."id" = :id`, { id: by.id });
        }
        if (by.ownerId) {
            query.andWhere(`"${this.mediaAlias}"."ownerId" = :ownerId`, { ownerId: by.ownerId });
        }
    }
};
TypeOrmMediaRepositoryAdapter = __decorate([
    (0, typeorm_1.EntityRepository)(TypeOrmMedia_1.TypeOrmMedia)
], TypeOrmMediaRepositoryAdapter);
exports.TypeOrmMediaRepositoryAdapter = TypeOrmMediaRepositoryAdapter;
//# sourceMappingURL=TypeOrmMediaRepositoryAdapter.js.map