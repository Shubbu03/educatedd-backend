import { UseCase } from '@core/common/usecase/UseCase';
import { GetEnrolledCourseListPort } from '@core/domain/course/port/usecase/GetEnrolledCourseListPort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';

export interface GetEnrolledCourseListUseCase extends UseCase<GetEnrolledCourseListPort, CourseUseCaseDto[]> {}

