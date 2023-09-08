"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmPostRepositoryAdapter = void 0;
const TypeOrmMedia_1 = require("@infrastructure/adapter/persistence/typeorm/entity/media/TypeOrmMedia");
const TypeOrmPostMapper_1 = require("@infrastructure/adapter/persistence/typeorm/entity/post/mapper/TypeOrmPostMapper");
const TypeOrmPost_1 = require("@infrastructure/adapter/persistence/typeorm/entity/post/TypeOrmPost");
const TypeOrmUser_1 = require("@infrastructure/adapter/persistence/typeorm/entity/user/TypeOrmUser");
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
let TypeOrmPostRepositoryAdapter = class TypeOrmPostRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.postAlias = 'post';
        this.excludeRemovedPostClause = `"${this.postAlias}"."removedAt" IS NULL`;
    }
    async findPost(by, options = {}) {
        let domainEntity;
        const query = this.buildPostQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedPostClause);
        }
        const ormEntity = await query.getOne();
        if (ormEntity) {
            domainEntity = TypeOrmPostMapper_1.TypeOrmPostMapper.toDomainEntity(ormEntity);
        }
        return domainEntity;
    }
    async findPosts(by, options = {}) {
        const query = this.buildPostQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedPostClause);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        if (options.offset) {
            query.limit(options.offset);
        }
        const ormPosts = await query.getMany();
        const domainPosts = TypeOrmPostMapper_1.TypeOrmPostMapper.toDomainEntities(ormPosts);
        return domainPosts;
    }
    async addPost(post) {
        const ormPost = TypeOrmPostMapper_1.TypeOrmPostMapper.toOrmEntity(post);
        const insertResult = await this
            .createQueryBuilder(this.postAlias)
            .insert()
            .into(TypeOrmPost_1.TypeOrmPost)
            .values([ormPost])
            .execute();
        return {
            id: insertResult.identifiers[0].id
        };
    }
    async updatePost(post) {
        const ormPost = TypeOrmPostMapper_1.TypeOrmPostMapper.toOrmEntity(post);
        await this.update(ormPost.id, ormPost);
    }
    async updatePosts(values, by, options = {}) {
        const query = this
            .createQueryBuilder(this.postAlias)
            .update(TypeOrmPost_1.TypeOrmPost)
            .set(values)
            .where(by);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedPostClause);
        }
        await query.execute();
    }
    async removePost(post, options = {}) {
        await post.remove();
        const ormPost = TypeOrmPostMapper_1.TypeOrmPostMapper.toOrmEntity(post);
        if (options.disableSoftDeleting) {
            await this.delete(ormPost);
        }
        if (!options.disableSoftDeleting) {
            await this.update(ormPost.id, ormPost);
        }
    }
    buildPostQueryBuilder() {
        return this
            .createQueryBuilder(this.postAlias)
            .select()
            .leftJoinAndMapOne(`${this.postAlias}.owner`, TypeOrmUser_1.TypeOrmUser, 'owner', `${this.postAlias}."ownerId" = owner.id`)
            .leftJoinAndMapOne(`${this.postAlias}.image`, TypeOrmMedia_1.TypeOrmMedia, 'image', `${this.postAlias}."imageId" = image.id`);
    }
    extendQueryWithByProperties(by, query) {
        if (by.id) {
            query.andWhere(`"${this.postAlias}"."id" = :id`, { id: by.id });
        }
        if (by.ownerId) {
            query.andWhere(`"${this.postAlias}"."ownerId" = :ownerId`, { ownerId: by.ownerId });
        }
        if (by.status) {
            query.andWhere(`"${this.postAlias}"."status" = :status`, { status: by.status });
        }
    }
};
TypeOrmPostRepositoryAdapter = __decorate([
    (0, typeorm_1.EntityRepository)(TypeOrmPost_1.TypeOrmPost)
], TypeOrmPostRepositoryAdapter);
exports.TypeOrmPostRepositoryAdapter = TypeOrmPostRepositoryAdapter;
//# sourceMappingURL=TypeOrmPostRepositoryAdapter.js.map