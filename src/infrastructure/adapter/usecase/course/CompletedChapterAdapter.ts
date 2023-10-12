import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { EditCompletePort } from '@core/domain/course/port/usecase/EditCompletePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class CompletedChapterAdapter extends UseCaseValidatableAdapter implements EditCompletePort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
//   @Expose()
//   @IsUUID()
//   public id: string;
  
  @Expose()
  @IsUUID()
  public courseId: string;

//   @Expose()
//   @IsOptional()
//   @IsString()
//   public description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public chapterCompleted?: string;


  
  public static async new(payload: EditCompletePort): Promise<CompletedChapterAdapter> {
    const adapter: CompletedChapterAdapter = plainToClass(CompletedChapterAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
