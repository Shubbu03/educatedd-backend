import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCreateCourseBody {
  @ApiProperty({type: 'string', format: 'binary'})
  public file: string;
}
