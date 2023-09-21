import { CourseType } from "@core/common/enums/CourseEnums";
import { Nullable } from "@core/common/type/CommonTypes";
import { Course } from "@core/domain/course/entity/Course";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { UploadFile } from "../../entity/UploadFile";

@Exclude()
export class CourseUseCaseDto {
  // @Expose()
  // public id: string;

  @Expose()
  public ownerId: string;

  @Expose()
  public courseId: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public pdfDetails: string;

  @Expose()
  public keywords: string[];

  @Expose()
  public type: CourseType;

  // @Expose()
  // public url: string;

  public createdAt: number;

  public editedAt: Nullable<number>;

  public static newFromCourse(course: Course): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, course);

    // dto.url = course.
    
    dto.createdAt = course.getCreatedAt().getTime();
    dto.editedAt = course.getEditedAt()?.getTime() || null;

    return dto;
  }

  public static upload_new(file: UploadFile): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, file);

    dto.pdfDetails = file.getMetadata().relativePath;
    dto.createdAt = file.getCreatedAt().getTime();
    dto.editedAt = file.getEditedAt()?.getTime() || null;

    return dto;
  }

  public static newListFromCourses(courses: Course[]): CourseUseCaseDto[] {
    return courses.map((courses) => this.newFromCourse(courses));
  }
}
