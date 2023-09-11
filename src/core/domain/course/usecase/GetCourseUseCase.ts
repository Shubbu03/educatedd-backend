import { UseCase } from '@core/common/usecase/UseCase';
import { GetCoursePort } from '@core/domain/course/port/usecase/GetCoursePort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';

export interface GetCourseUseCase extends UseCase<GetCoursePort, CourseUseCaseDto> {}
