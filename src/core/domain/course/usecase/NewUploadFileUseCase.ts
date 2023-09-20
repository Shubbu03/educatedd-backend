import { TransactionalUseCase } from "@core/common/usecase/TransactionalUseCase";
import { NewUploadFilePort } from "../port/usecase/NewUploadFilePort";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";

export interface NewUploadFileUseCase
  extends TransactionalUseCase<NewUploadFilePort, CourseUseCaseDto> {}