import { Course } from '@core/domain/course/entity/Course';
import { CourseFileStoragePort } from '@core/domain/course/port/persistence/CourseFileStoragePort';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';
import { CreateCoursePort } from '@core/domain/course/port/usecase/CreateCoursePort';
import { CreateCourseUseCase } from '@core/domain/course/usecase/CreateCourseUseCase';
import {CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export class CreateCourseService implements CreateCourseUseCase {
  
  constructor(
    private readonly mediaRepository: CourseRepositoryPort,
    private readonly mediaFileStorage: CourseFileStoragePort,
  ) {}
  
  public async execute(payload: CreateCoursePort): Promise<CourseUseCaseDto> {
    const fileMetaData: FileMetadata = await this.mediaFileStorage.upload(payload.file, {type: payload.type});
    
    const course: Course = await Course.new({
      ownerId: payload.executorId,
      courseId:payload.executorId,
      title: payload.name,
      description:payload.name,
      pdfDetails:payload.name, 
      keywords: [payload.name],
      type: payload.type,
      metadata: fileMetaData,
    });
    
    await this.mediaRepository.addCourse(course);
    
    return CourseUseCaseDto.newFromCourse(course);
  }
  
}
