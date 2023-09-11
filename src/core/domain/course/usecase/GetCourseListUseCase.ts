import { UseCase } from '@core/common/usecase/UseCase';
import { GetCourseListPort } from '@core/domain/course/port/usecase/GetCourseListPort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';

export interface GetCourseListUseCase extends UseCase<GetCourseListPort, CourseUseCaseDto[]> {}

