import { TransactionalUseCase } from "@core/common/usecase/TransactionalUseCase";
import { UploadFilePort } from "../port/usecase/UploadFilePort";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";

export interface UploadFileUseCase
  extends TransactionalUseCase<UploadFilePort, CourseUseCaseDto> {}
