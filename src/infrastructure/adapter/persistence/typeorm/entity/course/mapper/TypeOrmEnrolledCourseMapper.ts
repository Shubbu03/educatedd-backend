import { Enrolled } from "@core/domain/course/entity/Enrolled";
import { TypeOrmEnrolledCourse } from "../TypeOrmEnrolledCourse";

export class TypeOrmEnrolledCourseMapper{
    public static toOrmEntity(domainEnrolled: Enrolled): TypeOrmEnrolledCourse{
        const ormEnrolled: TypeOrmEnrolledCourse = new TypeOrmEnrolledCourse();

        ormEnrolled.courseID = domainEnrolled.getCourseID();
        ormEnrolled.id = domainEnrolled.getOwnerId();
        ormEnrolled.userID = domainEnrolled.getUserID();

        console.log("ormEnrolled from typeormenrollcour mapper::",ormEnrolled)

        return ormEnrolled;
    }

    public static toOrmEntities(domainEnrolled: Enrolled[]): TypeOrmEnrolledCourse[] {
        return domainEnrolled.map((domainENCO) => this.toOrmEntity(domainENCO));
      }

      public static toDomainEntity(ormCourse: TypeOrmEnrolledCourse): Enrolled {
        // const metadata: FileMetadata = new FileMetadata({
        //   relativePath: ormCourse.relativePath,
        //   size: ormCourse.size,
        //   ext: ormCourse.ext,
        //   mimetype: ormCourse.mimetype,
        // });
    
        const domainCourse: Enrolled = new Enrolled({
          ownerId: ormCourse.id,
          courseID: ormCourse.courseID,
          userID: ormCourse.userID
          
        });

        console.log("DomainCourse from typeormenrollcour mapper::",domainCourse)
    
        return domainCourse;
      }
    
      public static toDomainEntities(ormCourses: TypeOrmEnrolledCourse[]): Enrolled[] {
        return ormCourses.map((ormCourse) => this.toDomainEntity(ormCourse));
      }
}