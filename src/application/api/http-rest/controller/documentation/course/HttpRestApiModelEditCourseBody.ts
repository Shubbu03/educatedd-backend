import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelEditCourseBody {
  @ApiProperty({type: 'string', required: false})
  public name: string;
}
