import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetCompleteChapterListPort } from '@core/domain/course/port/usecase/GetCompleteChapterListPort';
import { GetEnrolledCourseListPort } from '@core/domain/course/port/usecase/GetEnrolledCourseListPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

@Exclude()
export class GetCompleteChapterListAdapter extends UseCaseValidatableAdapter implements GetCompleteChapterListPort {
  
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
  
  public static async new(payload: GetEnrolledCourseListPort): Promise<GetCompleteChapterListAdapter> {
    const adapter: GetCompleteChapterListAdapter = plainToClass(GetCompleteChapterListAdapter, payload);
    await adapter.validate();
    
    console.log("Entered the get enrolled course adapter with payload::::",adapter,payload)
    return adapter;
  }
  
}
