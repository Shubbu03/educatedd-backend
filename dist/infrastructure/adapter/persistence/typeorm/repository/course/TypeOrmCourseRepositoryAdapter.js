"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmEnrolledCourseRepositoryAdapter = exports.TypeOrmUploadRepositoryAdapter = exports.TypeOrmCourseRepositoryAdapter = void 0;
const TypeOrmCourseMapper_1 = require("@infrastructure/adapter/persistence/typeorm/entity/course/mapper/TypeOrmCourseMapper");
const TypeOrmCourse_1 = require("@infrastructure/adapter/persistence/typeorm/entity/course/TypeOrmCourse");
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const TypeOrmFileMapper_1 = require("@infrastructure/adapter/persistence/typeorm/entity/course/mapper/TypeOrmFileMapper");
const TypeOrmEnrolledCourse_1 = require("../../entity/course/TypeOrmEnrolledCourse");
const TypeOrmEnrolledCourseMapper_1 = require("../../entity/course/mapper/TypeOrmEnrolledCourseMapper");
let TypeOrmCourseRepositoryAdapter = class TypeOrmCourseRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.courseAlias = "course";
        this.enrolledCourseAlias = "enrolled_course";
        this.completeAlias = "completedchapter";
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
    async findCourses(options = {}) {
        const query = this.buildCourseQueryBuilder();
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
    async findEnrolledCourses(by, options = {}) {
        const query = this.buildCourseQueryBuilder();
        this.extendQueryWithByPropertiesEnrolled(by, query);
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
        if (!options.includeRemoved) {
            query.andWhere(this.excludeRemovedCourseClause);
        }
        return query.getCount();
    }
    async addCourse(course) {
        const ormCourse = TypeOrmCourseMapper_1.TypeOrmCourseMapper.toOrmEntity(course);
        const insertResult = await this.createQueryBuilder(this.courseAlias)
            .insert()
            .into(TypeOrmCourse_1.TypeOrmCourse)
            .values([ormCourse])
            .execute();
        return {
            id: insertResult.identifiers[0].id,
        };
    }
    async enrolledCourse(enrollCourse) {
        const ormEnrolled = TypeOrmEnrolledCourseMapper_1.TypeOrmEnrolledCourseMapper.toOrmEntity(enrollCourse);
        console.log("entered the enrolledCourse");
        const insertResult = await this.createQueryBuilder(this.courseAlias)
            .insert()
            .into(TypeOrmEnrolledCourse_1.TypeOrmEnrolledCourse)
            .values([ormEnrolled])
            .execute();
        console.log("insertResult from typeorm adapter is::", insertResult);
        return {
            enrolled: true,
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
        return this.createQueryBuilder(this.courseAlias).select();
    }
    extendQueryWithByProperties(by, query) {
        if (by.id) {
            query.andWhere(`"${this.courseAlias}"."id" = :id`, { id: by.id });
        }
        if (by.ownerId) {
            query.andWhere(`"${this.courseAlias}"."ownerId" = :ownerId`, {
                ownerId: by.ownerId,
            });
        }
    }
    extendQueryWithByPropertiesEnrolled(by, query) {
        if (by.userID) {
            const subQuery = (0, typeorm_1.getManager)()
                .createQueryBuilder(this.enrolledCourseAlias, "ec")
                .select(`"courseID"`)
                .where(`"userID" = '${by.userID}'`);
            query.where(`"id" in (${subQuery.getQuery()})`);
        }
    }
};
TypeOrmCourseRepositoryAdapter = __decorate([
    (0, typeorm_1.EntityRepository)(TypeOrmCourse_1.TypeOrmCourse)
], TypeOrmCourseRepositoryAdapter);
exports.TypeOrmCourseRepositoryAdapter = TypeOrmCourseRepositoryAdapter;
class TypeOrmUploadRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.courseAlias = "course";
    }
    async uploadFile(file) {
        const ormCourse = TypeOrmFileMapper_1.TypeOrmFileMapper.toOrmEntity(file);
        const uploadDoc = await this.createQueryBuilder(this.courseAlias)
            .insert()
            .into(TypeOrmCourse_1.TypeOrmCourse)
            .values([ormCourse])
            .execute();
        return {
            url: uploadDoc.identifiers[0].id,
        };
    }
}
exports.TypeOrmUploadRepositoryAdapter = TypeOrmUploadRepositoryAdapter;
let TypeOrmEnrolledCourseRepositoryAdapter = class TypeOrmEnrolledCourseRepositoryAdapter extends typeorm_transactional_cls_hooked_1.BaseRepository {
    constructor() {
        super(...arguments);
        this.courseIDAlias = "courseID";
        this.enrolledCourseAlias = "enrolled_course";
        this.courseAlias = "course";
        this.completeAlias = "completedchapter";
        this.excludeRemovedCourseClause = `"${this.courseAlias}"."removedAt" IS NULL`;
    }
    async enrolledCourse(enrollCourse) {
        const ormEnrolled = TypeOrmEnrolledCourseMapper_1.TypeOrmEnrolledCourseMapper.toOrmEntity(enrollCourse);
        const insertResult = await this.createQueryBuilder(this.courseIDAlias)
            .insert()
            .into(TypeOrmEnrolledCourse_1.TypeOrmEnrolledCourse)
            .values([ormEnrolled])
            .execute();
        console.log("insertResult from typeorm adapter is::", insertResult);
        return {
            enrolled: true,
        };
    }
    async update_complete(course) {
        const ormCourse = TypeOrmEnrolledCourseMapper_1.TypeOrmEnrolledCourseMapper.toOrmEntity(course);
        console.log("ENTERED UPDATE_COMPLETE FROM TYPEORM COURSE REPO", ormCourse);
        await this.update(ormCourse.courseID, ormCourse);
        console.log("ENTERED UPDATE FROM TYPEORM COURSE REPO", ormCourse);
    }
    async findCompleteCourse(by, options) {
        let domainEntity;
        const query = this.buildCompleteCourseQueryBuilder();
        console.log("QUERY FROM FIND COMPLETE COURSE::", query);
        this.extendQueryWithByPropertiesCompleteCourse(by, query);
        console.log("QUERY FROM FIND COMPLETE COURSE AFTER BY ::", query.getQuery());
        const ormEntity = await query.execute();
        if (ormEntity) {
            domainEntity = TypeOrmEnrolledCourseMapper_1.TypeOrmEnrolledCourseMapper.toDomainEntity(ormEntity);
        }
        console.log("QUERY FROM FIND COMPLETE COURSE BEFORE RETURN ::", query.getQuery());
        return domainEntity;
    }
    buildCompleteCourseQueryBuilder() {
        return this.createQueryBuilder();
    }
    extendQueryWithByPropertiesCompleteCourse(by, query) {
        if (by.userID || by.courseID) {
            query
                .update(this.enrolledCourseAlias)
                .set(`"completedchapter" = '${by.completedchapter}'`)
                .where(`"courseID" = '${by.courseID}'`)
                .andWhere(`"userID" = '${by.userID}'`);
            console.log("QUERY FROM COMPLETEDCHAPTER IS::", query.getQuery());
        }
    }
};
TypeOrmEnrolledCourseRepositoryAdapter = __decorate([
    (0, typeorm_1.EntityRepository)(TypeOrmEnrolledCourse_1.TypeOrmEnrolledCourse)
], TypeOrmEnrolledCourseRepositoryAdapter);
exports.TypeOrmEnrolledCourseRepositoryAdapter = TypeOrmEnrolledCourseRepositoryAdapter;
//# sourceMappingURL=TypeOrmCourseRepositoryAdapter.js.map