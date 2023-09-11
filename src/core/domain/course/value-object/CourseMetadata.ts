import { Nullable } from '@core/common/type/CommonTypes';
import { ValueObject } from '@core/common/value-object/ValueObject';
import { CreateCourseFileMetadataValueObjectPayload } from '@core/domain/course/value-object/type/CreateCourseFileMetadataValueObjectPayload';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CourseFileMetadata extends ValueObject {
  
  @IsString()
  public readonly relativePath: string;
  
  @IsOptional()
  @IsNumber()
  public readonly size: Nullable<number>;
  
  @IsOptional()
  @IsString()
  public readonly ext: Nullable<string>;
  
  @IsOptional()
  @IsString()
  public readonly mimetype: Nullable<string>;
  
  constructor(payload: CreateCourseFileMetadataValueObjectPayload) {
    super();
  
    this.relativePath = payload.relativePath;
    this.size         = payload.size || null;
    this.ext          = payload.ext || null;
    this.mimetype     = payload.mimetype || null;
  }
  
  public static async new(payload: CreateCourseFileMetadataValueObjectPayload): Promise<CourseFileMetadata> {
    const fileMetadata: CourseFileMetadata = new CourseFileMetadata(payload);
    await fileMetadata.validate();
    
    return fileMetadata;
  }
  
}
