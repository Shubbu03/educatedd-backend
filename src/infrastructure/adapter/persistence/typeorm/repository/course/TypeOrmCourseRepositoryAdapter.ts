import { RepositoryFindOptions, RepositoryRemoveOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/type/CommonTypes';
import { Course } from '@core/domain/course/entity/Course';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';
import { TypeOrmCourseMapper } from '@infrastructure/adapter/persistence/typeorm/entity/course/mapper/TypeOrmCourseMapper';
import { TypeOrmCourse } from '@infrastructure/adapter/persistence/typeorm/entity/course/TypeOrmCourse';
import { EntityRepository, InsertResult, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(TypeOrmCourse)
export class TypeOrmCourseRepositoryAdapter extends BaseRepository<TypeOrmCourse> implements CourseRepositoryPort {
  
  private readonly courseAlias: string = 'course';
  
  private readonly excludeRemovedCourseClause: string = `"${this.courseAlias}"."removedAt" IS NULL`;
  
  public async findCourse(by: {id?: string}, options: RepositoryFindOptions = {}): Promise<Optional<Course>> {
    let domainEntity: Optional<Course>;
    
    const query: SelectQueryBuilder<TypeOrmCourse> = this.buildCourseQueryBuilder();
  
    this.extendQueryWithByProperties(by, query);
    
    if (!options.includeRemoved) {
      query.andWhere(this.excludeRemovedCourseClause);
    }
    
    const ormEntity: Optional<TypeOrmCourse> = await query.getOne();
    
    if (ormEntity) {
      domainEntity = TypeOrmCourseMapper.toDomainEntity(ormEntity);
    }
    
    return domainEntity;
  }
  
  public async findCourses(by: {ownerId?: string}, options: RepositoryFindOptions = {}): Promise<Course[]> {
    const query: SelectQueryBuilder<TypeOrmCourse> = this.buildCourseQueryBuilder();
  
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
    
    const ormCourses: TypeOrmCourse[] = await query.getMany();
    const domainCourses: Course[] = TypeOrmCourseMapper.toDomainEntities(ormCourses);
    
    return domainCourses;
  }
  
  public async countCourses(by: {id?: string, ownerId?: string}, options: RepositoryFindOptions = {}): Promise<number> {
    const query: SelectQueryBuilder<TypeOrmCourse> = this.buildCourseQueryBuilder();
  
    this.extendQueryWithByProperties(by, query);
    
    if (!options.includeRemoved) {
      query.andWhere(this.excludeRemovedCourseClause);
    }
    
    return query.getCount();
  }
  
  public async addCourse(course: Course): Promise<{id: string}> {
    const ormCourse: TypeOrmCourse = TypeOrmCourseMapper.toOrmEntity(course);
  
    const insertResult: InsertResult = await this
      .createQueryBuilder(this.courseAlias)
      .insert()
      .into(TypeOrmCourse)
      .values([ormCourse])
      .execute();
  
    return {
      id: insertResult.identifiers[0].id
    };
  }
  
  public async updateCourse(course: Course): Promise<void>{
    const ormCourse: TypeOrmCourse = TypeOrmCourseMapper.toOrmEntity(course);
    await this.update(ormCourse.id, ormCourse);
  }
  
  public async removeCourse(media: Course, options: RepositoryRemoveOptions = {}): Promise<void> {
    await media.remove();
    const ormMedia: TypeOrmCourse = TypeOrmCourseMapper.toOrmEntity(media);
    
    if (options.disableSoftDeleting) {
      await this.delete(ormMedia);
    }
    if (!options.disableSoftDeleting) {
      await this.update(ormMedia.id, ormMedia);
    }
  }
  
  private buildCourseQueryBuilder(): SelectQueryBuilder<TypeOrmCourse> {
    return this
      .createQueryBuilder(this.courseAlias)
      .select();
  }
  
  private extendQueryWithByProperties(by: {id?: string, ownerId?: string}, query: SelectQueryBuilder<TypeOrmCourse>): void {
    if (by.id) {
      query.andWhere(`"${this.courseAlias}"."id" = :id`, {id: by.id});
    }
    if (by.ownerId) {
      query.andWhere(`"${this.courseAlias}"."ownerId" = :ownerId`, {ownerId: by.ownerId});
    }
  }
  
}
