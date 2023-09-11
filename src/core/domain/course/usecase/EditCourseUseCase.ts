import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { EditCoursePort } from '@core/domain/course/port/usecase/EditCoursePort';
import { CourseUseCaseDto } from '@core/domain/course/usecase/dto/CourseUseCaseDto';

export interface EditCourseUseCase extends TransactionalUseCase<EditCoursePort, CourseUseCaseDto> {}
