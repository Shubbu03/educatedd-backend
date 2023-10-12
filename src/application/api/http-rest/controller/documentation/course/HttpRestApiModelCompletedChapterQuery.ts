import { CourseType } from "@core/common/enums/CourseEnums";
import { ApiProperty } from "@nestjs/swagger";

export class HttpRestApiModelCompletedChapterQuery {
  @ApiProperty({ type: "string", required: true })
  public CourseID: string;

  @ApiProperty({ type: "string", required: true })
  public chapterCompleted: string;
}
