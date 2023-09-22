import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type EditCourseEntityPayload = {
    title?:string,
    description?:string,
    metadata?:FileMetadata
}