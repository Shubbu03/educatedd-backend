import { Course } from "@core/domain/course/entity/Course";
import { FileMetadata } from "@core/domain/media/value-object/FileMetadata";
import { TypeOrmCourse } from "@infrastructure/adapter/persistence/typeorm/entity/course/TypeOrmCourse";

export class TypeOrmCourseMapper {
  public static toOrmEntity(domainCourse: Course): TypeOrmCourse {
    const ormCourse: TypeOrmCourse = new TypeOrmCourse();

    ormCourse.id = domainCourse.getId();
    ormCourse.ownerId = domainCourse.getOwnerId();
    ormCourse.title = domainCourse.getTitle();
    ormCourse.description = domainCourse.getDescription();
    ormCourse.pdfDetails = domainCourse.getPdfDescription();
    // ormCourse.type         = domainCourse.getType();

    // ormCourse.relativePath = domainCourse.getMetadata().relativePath;
    // ormCourse.size         = domainCourse.getMetadata().size as number;
    // ormCourse.ext          = domainCourse.getMetadata().ext as string;
    // ormCourse.mimetype     = domainCourse.getMetadata().mimetype as string;

    ormCourse.createdAt = domainCourse.getCreatedAt();
    ormCourse.editedAt = domainCourse.getEditedAt() as Date;
    ormCourse.removedAt = domainCourse.getRemovedAt() as Date;

    return ormCourse;
  }

  public static toOrmEntities(domainCourses: Course[]): TypeOrmCourse[] {
    return domainCourses.map((domainCourse) => this.toOrmEntity(domainCourse));
  }

  public static toDomainEntity(ormCourse: TypeOrmCourse): Course {
    const metadata: FileMetadata = new FileMetadata({
      relativePath: ormCourse.relativePath,
      size: ormCourse.size,
      ext: ormCourse.ext,
      mimetype: ormCourse.mimetype,
    });

    const domainCourse: Course = new Course({
      ownerId: ormCourse.ownerId,
      id: ormCourse.id,
      title: ormCourse.title,
      description: ormCourse.description,
      pdfDetails: ormCourse.pdfDetails,
      // keywords:ormCourse.keywords,
      // type     : ormCourse.type,
      // metadata : metadata,
      // id       : ormCourse.id,
      createdAt: ormCourse.createdAt,
      editedAt: ormCourse.editedAt,
      removedAt: ormCourse.removedAt,
    });

    return domainCourse;
  }

  public static toDomainEntities(ormCourses: TypeOrmCourse[]): Course[] {
    return ormCourses.map((ormCourse) => this.toDomainEntity(ormCourse));
  }
}
