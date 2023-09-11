import { CourseFileStorageOptions } from "@core/common/persistence/CourseFileStorageOptions";
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export interface CourseFileStoragePort {
    upload(file: Buffer|NodeJS.ReadableStream, options: CourseFileStorageOptions): Promise<FileMetadata>;
  }