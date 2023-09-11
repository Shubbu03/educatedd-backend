import { HttpRestApiResponse } from '@application/api/http-rest/controller/documentation/common/HttpRestApiResponse';
import { HttpRestApiModelCourse } from '@application/api/http-rest/controller/documentation/course/HttpRestApiModelCourse';
import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiResponseCourse extends HttpRestApiResponse {
  @ApiProperty({type: HttpRestApiModelCourse})
  public data: HttpRestApiModelCourse;
}

