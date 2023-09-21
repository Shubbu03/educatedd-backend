import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetCoursePort } from '@core/domain/course/port/usecase/GetCoursePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class GetCourseAdapter extends UseCaseValidatableAdapter implements GetCoursePort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
  @Expose()
  @IsUUID()
  public id: string;
  
  public static async new(payload: GetCoursePort): Promise<GetCourseAdapter> {

    console.log("New Payload from GetCourseAdapter.ts is::",payload);
    const adapter: GetCourseAdapter = plainToClass(GetCourseAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
