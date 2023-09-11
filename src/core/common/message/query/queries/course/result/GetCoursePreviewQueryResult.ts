import { CourseType } from '@core/common/enums/CourseEnums';

export class GetCoursePreviewQueryResult {
  
  public readonly id: string;
  
  public readonly type: CourseType;
  
  public readonly relativePath: string;
  
  constructor(id: string, type: CourseType, relativePath: string) {
    this.id = id;
    this.type = type;
    this.relativePath = relativePath;
  }
  
  public static new(id: string, type: CourseType, relativePath: string): GetCoursePreviewQueryResult {
    return new GetCoursePreviewQueryResult(id, type, relativePath);
  }
  
}
