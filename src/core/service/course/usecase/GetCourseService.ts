import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { Course } from '@core/domain/course/entity/Course';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';
import { GetCoursePort } from '@core/domain/course/port/usecase/GetCoursePort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';
import { GetCourseUseCase } from '@core/domain/course/usecase/GetCourseUseCase';

export class GetCourseService implements GetCourseUseCase {
  
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
  ) {}
  
  public async execute(payload: GetCoursePort): Promise<CourseUseCaseDto> {
    const media: Course = CoreAssert.notEmpty(
      await this.courseRepository.findCourse({id: payload.courseId}),
      Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Course not found.'})
    );
  
    const hasAccess: boolean = payload.executorId === media.getOwnerId();
    CoreAssert.isTrue(hasAccess, Exception.new({code: Code.ACCESS_DENIED_ERROR}));
    
    return CourseUseCaseDto.newFromCourse(media);
  }
  
}
