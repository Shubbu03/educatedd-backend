"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmUserRepositoryAdapter = void 0;
const TypeOrmUserMapper_1 = require("@infrastructure/adapter/persistence/typeorm/entity/user/mapper/TypeOrmUserMapper");
const TypeOrmUser_1 = require("@infrastructure/adapter/persistence/typeorm/entity/user/TypeOrmUser");
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
let TypeOrmUserRepositoryAdapter = class TypeOrmUserRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.userAlias = 'user';
        this.excludeRemovedUserClause = `"${this.userAlias}"."removedAt" IS NULL`;
    }
    async findUser(by, options = {}) {
        let domainEntity;
        const query = this.buildUserQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedUserClause);
        }
        const ormEntity = await query.getOne();
        if (ormEntity) {
            domainEntity = TypeOrmUserMapper_1.TypeOrmUserMapper.toDomainEntity(ormEntity);
        }
        return domainEntity;
    }
    async countUsers(by, options = {}) {
        const query = this.buildUserQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedUserClause);
        }
        return query.getCount();
    }
    async addUser(user) {
        const ormUser = TypeOrmUserMapper_1.TypeOrmUserMapper.toOrmEntity(user);
        const insertResult = await this
            .createQueryBuilder(this.userAlias)
            .insert()
            .into(TypeOrmUser_1.TypeOrmUser)
            .values([ormUser])
            .execute();
        return {
            id: insertResult.identifiers[0].id
        };
    }
    async updateUser(user) {
        const ormUser = TypeOrmUserMapper_1.TypeOrmUserMapper.toOrmEntity(user);
        await this.update(ormUser.id, ormUser);
    }
    buildUserQueryBuilder() {
        return this
            .createQueryBuilder(this.userAlias)
            .select();
    }
    extendQueryWithByProperties(by, query) {
        if (by.id) {
            query.andWhere(`"${this.userAlias}"."id" = :id`, { id: by.id });
        }
        if (by.email) {
            query.andWhere(`"${this.userAlias}"."email" = :email`, { email: by.email });
        }
    }
};
TypeOrmUserRepositoryAdapter = __decorate([
    (0, typeorm_1.EntityRepository)(TypeOrmUser_1.TypeOrmUser)
], TypeOrmUserRepositoryAdapter);
exports.TypeOrmUserRepositoryAdapter = TypeOrmUserRepositoryAdapter;
//# sourceMappingURL=TypeOrmUserRepositoryAdapter.js.map