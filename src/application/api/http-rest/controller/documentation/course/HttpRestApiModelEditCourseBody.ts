import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelEditCourseBody {
  @ApiProperty({type: 'string', required: true})
  public title: string;

  @ApiProperty({type: "string" , required: false})
  public description: string;
}
