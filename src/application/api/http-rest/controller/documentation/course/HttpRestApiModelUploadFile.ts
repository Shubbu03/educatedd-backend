import { CourseType } from "@core/common/enums/CourseEnums";
import { ApiProperty } from "@nestjs/swagger";

export class HttpRestApiModelUploadFile {
//   @ApiProperty({ type: "string", format: "binary" })
//   public name: string;

//   @ApiProperty({ type: "string", format: "binary" })
//   public type: CourseType;

  @ApiProperty({ type: "string", format: "binary" })
  public file: string;
}
