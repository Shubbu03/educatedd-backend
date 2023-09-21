import { CourseType } from '@core/common/enums/CourseEnums';

export class CourseRemovedEvent {
  
  public readonly courseId: string;
  
  public readonly ownerId: string;
  
  // public readonly type: CourseType;
  
  private constructor(courseId: string,ownerId: string ) {
    this.courseId = courseId;
    this.ownerId = ownerId;

  }
  
  public static new(courseId: string,ownerId: string): CourseRemovedEvent {
    return new CourseRemovedEvent(courseId,ownerId );
  }
  
}
