import { Course } from '@core/domain/course/entity/Course';
import { CourseFileStoragePort } from '@core/domain/course/port/persistence/CourseFileStoragePort';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';
import { CreateCoursePort } from '@core/domain/course/port/usecase/CreateCoursePort';
import { CreateCourseUseCase } from '@core/domain/course/usecase/CreateCourseUseCase';
import {CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';
import {v4 as uuidv4} from 'uuid';

export class CreateCourseService implements CreateCourseUseCase {
  
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
    private readonly courseFileStorage: CourseFileStoragePort,
  ) {}
  
  public async execute(payload: CreateCoursePort): Promise<CourseUseCaseDto> {
    // const fileMetaData: FileMetadata = await this.courseFileStorage.upload(payload.pdfDetails, {type: payload.type});
    
    const course: Course = await Course.new({
      ownerId: payload.executorId,
      id: uuidv4(),
      title: payload.title,
      description:payload.description,
      pdfDetails:payload.pdfDetails, 
      // keywords: payload.keywords,
      // type: payload.type,
      // metadata: fileMetaData,
    });

    console.log("NEWLY added course from CreateCourseService.ts is::",course);
    
    await this.courseRepository.addCourse(course);
    
    return CourseUseCaseDto.newFromCourse(course);
  }
  
}
