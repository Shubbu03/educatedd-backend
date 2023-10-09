import {
  RepositoryFindOptions,
  RepositoryRemoveOptions,
} from "@core/common/persistence/RepositoryOptions";
import { Optional } from "@core/common/type/CommonTypes";
import { Course } from "@core/domain/course/entity/Course";
import { UploadFile } from "@core/domain/course/entity/UploadFile";
import {
  CourseRepositoryPort,
  EnrolledCourseRepositoryPort,
  UploadNewFileRepositoryPort,
} from "@core/domain/course/port/persistence/CourseRepositoryPort";
import { TypeOrmCourseMapper } from "@infrastructure/adapter/persistence/typeorm/entity/course/mapper/TypeOrmCourseMapper";
import { TypeOrmCourse } from "@infrastructure/adapter/persistence/typeorm/entity/course/TypeOrmCourse";
import { EntityRepository, InsertResult, SelectQueryBuilder, getManager, getRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { TypeOrmFile } from "../../entity/course/TypeOrmFile";
import { TypeOrmFileMapper } from "@infrastructure/adapter/persistence/typeorm/entity/course/mapper/TypeOrmFileMapper";
import { Enrolled } from "@core/domain/course/entity/Enrolled";
// import {Enrol}
import { TypeOrmEnrolledCourse } from "../../entity/course/TypeOrmEnrolledCourse";
import { TypeOrmEnrolledCourseMapper } from "../../entity/course/mapper/TypeOrmEnrolledCourseMapper";
import { query } from "express";



@EntityRepository(TypeOrmCourse)
export class TypeOrmCourseRepositoryAdapter
  extends BaseRepository<TypeOrmCourse>
  implements CourseRepositoryPort
{
  private readonly courseAlias: string = "course";

  private readonly enrolledCourseAlias: string = "enrolled_course";

  private readonly excludeRemovedCourseClause: string = `"${this.courseAlias}"."removedAt" IS NULL`;

  // private subQuery: string = "subQuery";
   
  // public subQuery = getManager()
  //   .createQueryBuilder(this.enrolledCourseAlias,'ec').select(`courseID`)
  //   .where(`"userID" = :userID`,{
  //     userID : by.userID
  //   })
  //   .subQuery()


  public async findCourse(
    by: { id?: string },
    options: RepositoryFindOptions = {}
  ): Promise<Optional<Course>> {
    let domainEntity: Optional<Course>;

    const query: SelectQueryBuilder<TypeOrmCourse> =
      this.buildCourseQueryBuilder();

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

  public async findCourses(
    // by: { ownerId?: string },
    options: RepositoryFindOptions = {}
  ): Promise<Course[]> {
    const query: SelectQueryBuilder<TypeOrmCourse> =
      this.buildCourseQueryBuilder();

    // this.extendQueryWithByProperties1(query);

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
    const domainCourses: Course[] =
      TypeOrmCourseMapper.toDomainEntities(ormCourses);

    return domainCourses;
  }

  public async findEnrolledCourses(
    by: { userID?: string },
    options: RepositoryFindOptions = {}
  ): Promise<Course[]> {
    const query: SelectQueryBuilder<TypeOrmCourse> =
      this.buildCourseQueryBuilder(); 
      // this.buildCourseQueryBuilderWithID();

    this.extendQueryWithByPropertiesEnrolled(by,query);

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
    const domainCourses: Course[] =
      TypeOrmCourseMapper.toDomainEntities(ormCourses);

    return domainCourses;
  }

  public async countCourses(
    by: { id?: string; },
    options: RepositoryFindOptions = {}
  ): Promise<number> {
    const query: SelectQueryBuilder<TypeOrmCourse> =
      this.buildCourseQueryBuilder();

    // this.extendQueryWithByProperties(by, query);

    if (!options.includeRemoved) {
      query.andWhere(this.excludeRemovedCourseClause);
    }

    return query.getCount();
  }

  public async addCourse(course: Course): Promise<{ id: string }> {
    const ormCourse: TypeOrmCourse = TypeOrmCourseMapper.toOrmEntity(course);

    const insertResult: InsertResult = await this.createQueryBuilder(
      this.courseAlias
    )
      .insert()
      .into(TypeOrmCourse)
      .values([ormCourse])
      .execute();

    return {
      id: insertResult.identifiers[0].id,
    };
  }

  public async enrolledCourse(
    enrollCourse: Enrolled
  ): Promise<{ enrolled: boolean }> {
    const ormEnrolled: TypeOrmEnrolledCourse =
      TypeOrmEnrolledCourseMapper.toOrmEntity(enrollCourse);

      console.log("entered the enrolledCourse")

    const insertResult: InsertResult = await this.createQueryBuilder(
      this.courseAlias
    )
      .insert()
      .into(TypeOrmEnrolledCourse)
      .values([ormEnrolled])
      .execute();

    console.log("insertResult from typeorm adapter is::", insertResult);

    return {
      enrolled: true,
    };
  }

  public async updateCourse(course: Course): Promise<void> {
    const ormCourse: TypeOrmCourse = TypeOrmCourseMapper.toOrmEntity(course);
    await this.update(ormCourse.id, ormCourse);
  }

  public async removeCourse(
    media: Course,
    options: RepositoryRemoveOptions = {}
  ): Promise<void> {
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
    return this.createQueryBuilder(this.courseAlias).select();
  }

  // private buildCourseQueryBuilderWithID(): SelectQueryBuilder<TypeOrmCourse> {
  //   return this.createQueryBuilder(this.courseAlias).select().where(`"id"`);
  // }

  private extendQueryWithByProperties(
    by: { id?: string; ownerId?: string },
    query: SelectQueryBuilder<TypeOrmCourse>
  ): void {
    if (by.id) {
      query.andWhere(`"${this.courseAlias}"."id" = :id`, { id: by.id });
    }
    if (by.ownerId) {
      query.andWhere(`"${this.courseAlias}"."ownerId" = :ownerId`, {
        ownerId: by.ownerId,
      });
    }
  }

  private extendQueryWithByPropertiesEnrolled(
    by: { userID?: string },
    query: SelectQueryBuilder<TypeOrmCourse>
  ): void {

    // const subQuery = getManager()
    // .createQueryBuilder(this.enrolledCourseAlias,'ec').select(`courseID`)
    // .where(`"userID" = :userID`,{
    //   userID : by.userID
    // })
    // .subQuery()
  
    if (by.userID) {

      // const subQuery = getManager()
      // .createQueryBuilder(this.courseAlias,'c')
      // .select()
      // .where(``)

         const subQuery = getManager()
      .createQueryBuilder(this.enrolledCourseAlias,'ec').select(`"courseID"`)
      .where(`"userID" = '${by.userID}'`)
      // .subQuery()

      console.log("Subquery is::",subQuery.getQuery())

      query.where(`"id" in (${subQuery.getQuery()})`)

      console.log("Query is::",query.getQuery())



      // Select * from Course where Id in (Select courseid from EnrolledCourse where userid = <userid>)




      // query.leftJoinAndSelect(`"${this.enrolledCourseAlias}" "${this.courseAlias}"."id" = ${this.enrolledCourseAlias}."courseID"`,`e`)
      //  .where(`"${this.enrolledCourseAlias}"."userID" = :userID`,{
      //   userID : by.userID
      //  })
      // query.andWhere(`"${this.courseAlias}"."userID" = :userID`, {
      //   userID: by.userID,
      // });
    }
  }
}

export class TypeOrmUploadRepositoryAdapter
  extends BaseRepository<TypeOrmFile>
  implements UploadNewFileRepositoryPort
{
  private readonly courseAlias: string = "course";

  public async uploadFile(file: UploadFile): Promise<{ url: string }> {
    const ormCourse: TypeOrmFile = TypeOrmFileMapper.toOrmEntity(file);

    const uploadDoc: InsertResult = await this.createQueryBuilder(
      this.courseAlias
    )
      .insert()
      .into(TypeOrmCourse)
      .values([ormCourse])
      .execute();

    return {
      url: uploadDoc.identifiers[0].id,
    };
  }
}

export class TypeOrmEnrolledCourseRepositoryAdapter
  extends BaseRepository<TypeOrmEnrolledCourse>
  implements EnrolledCourseRepositoryPort
{
  private readonly courseIDAlias: string = "courseID";

  public async enrolledCourse(
    enrollCourse: Enrolled
  ): Promise<{ enrolled: boolean }> {
    const ormEnrolled: TypeOrmEnrolledCourse =
      TypeOrmEnrolledCourseMapper.toOrmEntity(enrollCourse);

    const insertResult: InsertResult = await this.createQueryBuilder(
      this.courseIDAlias
    )
      .insert()
      .into(TypeOrmEnrolledCourse)
      .values([ormEnrolled])
      .execute();

    console.log("insertResult from typeorm adapter is::", insertResult);

    return {
      enrolled: true,
    };
  }
}
