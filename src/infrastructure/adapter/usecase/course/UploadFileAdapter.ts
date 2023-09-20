import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UseCaseValidatableAdapter";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsDefined, IsEnum, IsString, IsUUID } from "class-validator";
import { UploadFilePort } from "@core/domain/course/port/usecase/UploadFilePort";
import { CourseType } from "@core/common/enums/CourseEnums";
import { NewUploadFilePort } from "@core/domain/course/port/usecase/NewUploadFilePort";

@Exclude()
export class UploadFileAdapter
  extends UseCaseValidatableAdapter
  implements UploadFilePort
{
  // @Expose()
  // @IsUUID()
  // public courseId: string;

  // @Expose()
  // @IsString()
  // public name: string;

  // @Expose()
  // @IsEnum(CourseType)
  // public type: CourseType;

  @Expose()
  // @IsDefined()
  public file: Buffer | NodeJS.ReadableStream;

  public static async new(payload: UploadFilePort): Promise<UploadFileAdapter> {
    const adapter: UploadFileAdapter = plainToClass(UploadFileAdapter, payload);
    console.log(payload);
    // await adapter.validate();

    console.log(adapter);

    return adapter;
  }
}

@Exclude()
export class NewUploadFileAdapter
  extends UseCaseValidatableAdapter
  implements NewUploadFilePort
{
  // @Expose()
  // @IsUUID()
  // public courseId: string;

  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  public url: string;

  // @Expose()
  // @IsEnum(CourseType)
  // public type: CourseType;

  @Expose()
  // @IsDefined()
  public file: Buffer;

  public static async new(
    payload: NewUploadFilePort
  ): Promise<NewUploadFileAdapter> {
    const adapter: NewUploadFileAdapter = plainToClass(
      NewUploadFileAdapter,
      payload
    );
    // console.log(payload);
    // await adapter.validate();

    // console.log(adapter);

    return adapter;
  }
}
