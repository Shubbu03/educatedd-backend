import { CourseType } from '@core/common/enums/CourseEnums';

export class CourseRemovedEvent {
  
  public readonly id: string;
  
  public readonly ownerId: string;
  
  // public readonly type: CourseType;
  
  private constructor(id: string,ownerId: string ) {
    this.id = id;
    this.ownerId = ownerId;

  }
  
  public static new(id: string,ownerId: string): CourseRemovedEvent {
    return new CourseRemovedEvent(id,ownerId );
  }
  
}
