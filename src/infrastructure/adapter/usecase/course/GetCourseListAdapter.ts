import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetCourseListPort } from '@core/domain/course/port/usecase/GetCourseListPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class GetCourseListAdapter extends UseCaseValidatableAdapter implements GetCourseListPort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
  public static async new(payload: GetCourseListPort): Promise<GetCourseListAdapter> {
    const adapter: GetCourseListAdapter = plainToClass(GetCourseListAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
