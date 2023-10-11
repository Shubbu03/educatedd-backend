import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { EditCoursePort } from '@core/domain/course/port/usecase/EditCoursePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class EditCourseAdapter extends UseCaseValidatableAdapter implements EditCoursePort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
  @Expose()
  @IsUUID()
  public id: string;
  
  @Expose()
  @IsOptional()
  @IsString()
  public title?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public chapter?: string;


  
  public static async new(payload: EditCoursePort): Promise<EditCourseAdapter> {
    const adapter: EditCourseAdapter = plainToClass(EditCourseAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
