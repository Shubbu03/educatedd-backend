import { CourseType } from '@core/common/enums/CourseEnums';
import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCreateCourseQuery {
  
  @ApiProperty({type: 'string', required: false})
  public name: string;
  
  @ApiProperty({enum: CourseType})
  public type: CourseType;
  
}
