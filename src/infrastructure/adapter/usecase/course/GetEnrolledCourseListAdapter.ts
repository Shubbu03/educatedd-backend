import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetEnrolledCourseListPort } from '@core/domain/course/port/usecase/GetEnrolledCourseListPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

@Exclude()
export class GetEnrolledCourseListAdapter extends UseCaseValidatableAdapter implements GetEnrolledCourseListPort {
  
  @Expose()
  @IsUUID()
  public executorId: string;

//   @Expose()
//   @IsString()
//   public title: string;

//   @Expose()
//   @IsString()
//   public description: string;

//   @Expose()
//   @IsString()
//   public isEnrolled: boolean;
  
  public static async new(payload: GetEnrolledCourseListPort): Promise<GetEnrolledCourseListAdapter> {
    const adapter: GetEnrolledCourseListAdapter = plainToClass(GetEnrolledCourseListAdapter, payload);
    await adapter.validate();
    
    console.log("Entered the get enrolled course adapter with payload::::",adapter,payload)
    return adapter;
  }
  
}
