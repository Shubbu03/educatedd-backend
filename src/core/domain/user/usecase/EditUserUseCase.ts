import { UseCase } from '@core/common/usecase/UseCase';
import { EditUserPort } from '@core/domain/user/port/usecase/EditUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export interface EditUserUseCase extends UseCase<EditUserPort, UserUseCaseDto> {}
