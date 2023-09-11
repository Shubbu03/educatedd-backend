import { CourseType } from '@core/common/enums/CourseEnums';
import { Nullable } from '@core/common/type/CommonTypes';
import { Course } from '@core/domain/course/entity/Course';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class CourseUseCaseDto {

  @Expose()
  public id: string;
  
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
  
  public url: string;
  
  public createdAt: number;
  
  public editedAt: Nullable<number>;
  
  public static newFromCourse(course: Course): CourseUseCaseDto {
    const dto: CourseUseCaseDto = plainToClass(CourseUseCaseDto, course);
    
    dto.url = course.getMetadata().relativePath;
    dto.createdAt = course.getCreatedAt().getTime();
    dto.editedAt = course.getEditedAt()?.getTime() || null;
    
    return dto;
  }
  
  public static newListFromCourses(courses: Course[]): CourseUseCaseDto[] {
    return courses.map(courses => this.newFromCourse(courses));
  }
  
}
