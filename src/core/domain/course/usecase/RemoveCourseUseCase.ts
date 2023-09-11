import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { RemoveCoursePort } from '@core/domain/course/port/usecase/RemoveCoursePort';

export interface RemoveCourseUseCase extends TransactionalUseCase<RemoveCoursePort, void> {}
