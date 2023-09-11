"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmCourseRepositoryAdapter = void 0;
const TypeOrmCourseMapper_1 = require("@infrastructure/adapter/persistence/typeorm/entity/course/mapper/TypeOrmCourseMapper");
const TypeOrmCourse_1 = require("@infrastructure/adapter/persistence/typeorm/entity/course/TypeOrmCourse");
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
let TypeOrmCourseRepositoryAdapter = class TypeOrmCourseRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.courseAlias = 'course';
        this.excludeRemovedCourseClause = `"${this.courseAlias}"."removedAt" IS NULL`;
    }
    async findCourse(by, options = {}) {
        let domainEntity;
        const query = this.buildCourseQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedCourseClause);
        }
        const ormEntity = await query.getOne();
        if (ormEntity) {
            domainEntity = TypeOrmCourseMapper_1.TypeOrmCourseMapper.toDomainEntity(ormEntity);
        }
        return domainEntity;
    }
    async findCourses(by, options = {}) {
        const query = this.buildCourseQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedCourseClause);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        if (options.offset) {
            query.limit(options.offset);
        }
        const ormCourses = await query.getMany();
        const domainCourses = TypeOrmCourseMapper_1.TypeOrmCourseMapper.toDomainEntities(ormCourses);
        return domainCourses;
    }
    async countCourses(by, options = {}) {
        const query = this.buildCourseQueryBuilder();
        this.extendQueryWithByProperties(by, query);
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedCourseClause);
        }
        return query.getCount();
    }
    async addCourse(course) {
        const ormCourse = TypeOrmCourseMapper_1.TypeOrmCourseMapper.toOrmEntity(course);
        const insertResult = await this
            .createQueryBuilder(this.courseAlias)
            .insert()
            .into(TypeOrmCourse_1.TypeOrmCourse)
            .values([ormCourse])
            .execute();
        return {
            id: insertResult.identifiers[0].id
        };
    }
    async updateCourse(course) {
        const ormCourse = TypeOrmCourseMapper_1.TypeOrmCourseMapper.toOrmEntity(course);
        await this.update(ormCourse.id, ormCourse);
    }
    async removeCourse(media, options = {}) {
        await media.remove();
        const ormMedia = TypeOrmCourseMapper_1.TypeOrmCourseMapper.toOrmEntity(media);
        if (options.disableSoftDeleting) {
            await this.delete(ormMedia);
        }
        if (!options.disableSoftDeleting) {
            await this.update(ormMedia.id, ormMedia);
        }
    }
    buildCourseQueryBuilder() {
        return this
            .createQueryBuilder(this.courseAlias)
            .select();
    }
    extendQueryWithByProperties(by, query) {
        if (by.id) {
            query.andWhere(`"${this.courseAlias}"."id" = :id`, { id: by.id });
        }
        if (by.ownerId) {
            query.andWhere(`"${this.courseAlias}"."ownerId" = :ownerId`, { ownerId: by.ownerId });
        }
    }
};
TypeOrmCourseRepositoryAdapter = __decorate([
    (0, typeorm_1.EntityRepository)(TypeOrmCourse_1.TypeOrmCourse)
], TypeOrmCourseRepositoryAdapter);
exports.TypeOrmCourseRepositoryAdapter = TypeOrmCourseRepositoryAdapter;
//# sourceMappingURL=TypeOrmCourseRepositoryAdapter.js.map