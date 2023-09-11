import { CourseType } from '@core/common/enums/CourseEnums';

export class CourseRemovedEvent {
  
  public readonly courseId: string;
  
  public readonly ownerId: string;
  
  public readonly type: CourseType;
  
  private constructor(courseId: string, ownerId: string, type: CourseType) {
    this.courseId = courseId;
    this.ownerId = ownerId;
    this.type = type;
  }
  
  public static new(courseId: string, ownerId: string, type: CourseType): CourseRemovedEvent {
    return new CourseRemovedEvent(courseId, ownerId, type);
  }
  
}
