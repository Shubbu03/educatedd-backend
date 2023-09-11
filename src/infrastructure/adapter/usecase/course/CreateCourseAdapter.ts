import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UseCaseValidatableAdapter";
import { CourseType } from "@core/common/enums/CourseEnums";
import { CreateCoursePort } from "@core/domain/course/port/usecase/CreateCoursePort";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsDefined, IsEnum, IsString, IsUUID } from "class-validator";

@Exclude()
export class CreateCourseAdapter
  extends UseCaseValidatableAdapter
  implements CreateCoursePort
{
  @Expose()
  @IsUUID()
  public executorId: string;

  @Expose()
  @IsUUID()
  public courseId: string;

  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsEnum(CourseType)
  public type: CourseType;

  @Expose()
  @IsDefined()
  public file: Buffer | NodeJS.ReadableStream;

  public static async new(
    payload: CreateCoursePort
  ): Promise<CreateCourseAdapter> {
    const adapter: CreateCourseAdapter = plainToClass(
      CreateCourseAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
