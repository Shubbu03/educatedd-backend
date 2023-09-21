import { CourseType } from "@core/common/enums/CourseEnums";
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type CreateCourseEntityPayload = {
    ownerId: string,
    title: string,
    description:string,
    pdfDetails:string,
    // keywords:string[],
    // type: CourseType,
    // metadata: FileMetadata,
    courseId?: string,
    createdAt?: Date,
    editedAt?: Date,
    removedAt?: Date,
  };