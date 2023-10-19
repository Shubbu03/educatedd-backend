import { CourseType } from "@core/common/enums/CourseEnums";
import { Nullable } from "@core/common/type/CommonTypes";
import { Course } from "@core/domain/course/entity/Course";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { UploadFile } from "../../entity/UploadFile";
import { v4 as uuidv4 } from "uuid";
import { Enrolled } from "../../entity/Enrolled";

@Exclude()
export class CourseUseCaseDto {
  // @Expose()
  // public id: string;

  @Expose()
  public ownerId: string;

  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public pdfDetails: string;

  @Expose()
  public chapter: string;

  @Expose()
  public keywords: string[];

  @Expose()
  public type: string;

  // @Expose()
  // public url: string;

  public createdAt: number;

  public editedAt: Nullable<number>;

  // public static genUniqueId(): string {
  //   const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

  //   const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

  //   return `${dateStr}-${randomStr}`;
  // }

  public static newFromCourse(
    course: Course
    // file: UploadFile
  ): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, course);

    dto.type = "PDF";
    // dto.courseId = this.genUniqueId();
    // dto.courseId = uuidv4();
    // dto.description
    dto.id = course.getId();
    dto.chapter = course.getChapter();
    dto.pdfDetails = course.getPdfDescription();
    dto.createdAt = course.getCreatedAt().getTime();
    dto.editedAt = course.getEditedAt()?.getTime() || null;

    return dto;
  }

  public static newFromCompleteCourse(enroll: Enrolled): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, enroll);

    dto.ownerId = enroll.getOwnerId();
    dto.id = enroll.getCourseID();
    dto.chapter = enroll.getChapter();

    return dto;
  }



  public static newEnrolledCourse(enrolled: Course): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, enrolled);

    dto.title = enrolled.getTitle();
    dto.description = enrolled.getDescription();
    dto.pdfDetails = enrolled.getPdfDescription();

    return dto;
  }

  public static enrolledCourse(courseID: Enrolled): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, courseID);

    dto.id = courseID.getCourseID();

    return dto;
  }

  public static newEnrolledCourseListFromCourses(
    userID: Course[]
  ): CourseUseCaseDto[] {
    return userID.map((enroll) => this.newEnrolledCourse(enroll));
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

  public static newCompleteChapterList(courses: Enrolled[]): CourseUseCaseDto[] {
    return courses.map((courses) => this.newFromCompleteCourse(courses));
  }

  
}
