import { Course } from "@core/domain/course/entity/Course";
import { UploadFile } from "@core/domain/course/entity/UploadFile";
import { CourseFileStoragePort } from "@core/domain/course/port/persistence/CourseFileStoragePort";
import {
  CourseRepositoryPort,
  UploadNewFileRepositoryPort,
} from "@core/domain/course/port/persistence/CourseRepositoryPort";
import { NewUploadFilePort } from "@core/domain/course/port/usecase/NewUploadFilePort";
import { NewUploadFileUseCase } from "@core/domain/course/usecase/NewUploadFileUseCase";
import { UploadFilePort } from "@core/domain/course/port/usecase/UploadFilePort";
import { UploadFileUseCase } from "@core/domain/course/usecase/UploadFileUseCase";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { FileMetadata } from "@core/domain/media/value-object/FileMetadata";

import * as fs from "fs";
import * as path from "path";

export class UploadCourseService implements NewUploadFileUseCase {
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
    private readonly fileRepository: UploadNewFileRepositoryPort,
    private readonly courseFileStorage: CourseFileStoragePort
  ) {}

  public async execute(payload: NewUploadFilePort): Promise<any> {
    console.log("new payload from UploadCourseService.ts:", payload.file);

    var name = payload.name

    var callback = (err: any) => {
      if (err) {
        console.log("File not saved");
        throw err;
      } else {
        console.log("file is successfully saved!!");
      }
    };

    const directoryPath = `uploadedFiles`;

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const data = fs.writeFile(`${directoryPath}/${name}.pdf`, payload.file, callback);

    return `${directoryPath}/${name}.pdf`;
  }
}
