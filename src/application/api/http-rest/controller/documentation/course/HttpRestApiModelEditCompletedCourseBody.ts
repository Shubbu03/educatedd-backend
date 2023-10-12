import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelEditCompletedCourseBody {
//   @ApiProperty({type: 'string', required: true})
//   public title: string;

//   @ApiProperty({type: "string" , required: false})
//   public description: string;

  @ApiProperty({type: "string" , required: false})
  public chapterCompleted: string;
}
