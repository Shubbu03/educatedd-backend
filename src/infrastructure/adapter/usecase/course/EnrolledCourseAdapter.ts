import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UseCaseValidatableAdapter";
import { EnrolledCoursePort } from "@core/domain/course/port/usecase/EnrolledCoursePort";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsDefined, IsEnum, IsString, IsUUID, isUUID } from "class-validator";

@Exclude()
export class EnrolledCourseAdapter
  extends UseCaseValidatableAdapter
  implements EnrolledCoursePort
{
  @Expose()
  @IsUUID()
  public executorId: string;

  // @Expose()
  // @IsUUID()
  // public courseId: string;

  @Expose()
  @IsString()
  public courseId: string;

  @Expose()
  @IsUUID()
  public userId: string;

//   @Expose()
//   @IsString()
//   public description: string;

//   @Expose()
//   @IsString()
//   public pdfDetails: string;

  // @Expose()
  // @IsString()
  // public keywords: string[];

  public static async new(
    payload: EnrolledCoursePort
  ): Promise<EnrolledCourseAdapter> {
    const adapter: EnrolledCourseAdapter = plainToClass(
        EnrolledCourseAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
