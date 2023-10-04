import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { EnrolledCoursePort } from '@core/domain/course/port/usecase/EnrolledCoursePort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';

export interface EnrolledCourseUseCase extends TransactionalUseCase<EnrolledCoursePort , boolean> {}
