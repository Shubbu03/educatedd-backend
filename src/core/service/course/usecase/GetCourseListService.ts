import { Course } from '@core/domain/course/entity/Course';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';
import { GetCourseListPort } from '@core/domain/course/port/usecase/GetCourseListPort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';
import { GetCourseListUseCase } from '@core/domain/course/usecase/GetCourseListUseCase';

export class GetCourseListService implements GetCourseListUseCase {
  
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
  ) {}
  
  public async execute(payload: GetCourseListPort): Promise<CourseUseCaseDto[]> {
    const courses: Course[] = await this.courseRepository.findCourses({ownerId: payload.executorId});
    return CourseUseCaseDto.newListFromCourses(courses);
  }
  
}
