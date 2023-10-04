import { CourseType } from "@core/common/enums/CourseEnums";
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type EnrolledCourseEntityPayload = {
    ownerId: string,
    
    courseID: string,
    userID: string,
    createdAt?: Date,
    editedAt?: Date,
    removedAt?: Date,
  };