import { HttpRestApiResponse } from '@application/api/http-rest/controller/documentation/common/HttpRestApiResponse';
import { HttpRestApiModelCourse } from '@application/api/http-rest/controller/documentation/course/HttpRestApiModelCourse';
import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiResponseEnrolledCourse extends HttpRestApiResponse {
    @ApiProperty({type: HttpRestApiModelCourse, isArray: true})
    public data: HttpRestApiModelCourse[];
  }