import { CourseType } from "@core/common/enums/CourseEnums";
import { Nullable } from "@core/common/type/CommonTypes";
import { Course } from "@core/domain/course/entity/Course";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { UploadFile } from "../../entity/UploadFile";
import {v4 as uuidv4} from 'uuid';

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
    dto.pdfDetails = course.getPdfDescription();
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
