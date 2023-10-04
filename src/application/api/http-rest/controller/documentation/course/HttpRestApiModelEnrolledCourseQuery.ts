import { CourseType } from "@core/common/enums/CourseEnums";
import { ApiProperty } from "@nestjs/swagger";

export class HttpRestApiModelEnrolledCourseQuery {
  @ApiProperty({ type: "string", required: true })
  public CourseID: string;
}
