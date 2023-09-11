import { CourseType } from "@core/common/enums/CourseEnums";
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type CreateCourseEntityPayload = {
    ownerId: string,
    courseId: string,
    title: string,
    description:string,
    pdfDetails:string,
    keywords:string[],
    type: CourseType,
    metadata: FileMetadata,
    id?: string,
    createdAt?: Date,
    editedAt?: Date,
    removedAt?: Date,
  };