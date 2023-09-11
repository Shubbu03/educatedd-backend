import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { CreateCoursePort } from '@core/domain/course/port/usecase/CreateCoursePort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';

export interface CreateCourseUseCase extends TransactionalUseCase<CreateCoursePort, CourseUseCaseDto> {}
