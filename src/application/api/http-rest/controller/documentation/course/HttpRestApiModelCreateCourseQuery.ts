import { CourseType } from "@core/common/enums/CourseEnums";
import { ApiProperty } from "@nestjs/swagger";

export class HttpRestApiModelCreateCourseQuery {
  @ApiProperty({ type: "string", required: true })
  public Title: string;

  @ApiProperty({ type: "string", required: true })
  public Description: string;

  @ApiProperty({ type: "string", required: true })
  public pdfDetails: string;

  @ApiProperty({ type: "string", required: true })
  public chapter: string;

//   @ApiProperty({ type: "string", required: true })
//   public Keywords: string;
}
