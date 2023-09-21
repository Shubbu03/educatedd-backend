import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { RemoveCoursePort } from '@core/domain/course/port/usecase/RemoveCoursePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class RemoveCourseAdapter extends UseCaseValidatableAdapter implements RemoveCoursePort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
  @Expose()
  @IsUUID()
  public id: string;
  
  public static async new(payload: RemoveCoursePort): Promise<RemoveCourseAdapter> {
    const adapter: RemoveCourseAdapter = plainToClass(RemoveCourseAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
