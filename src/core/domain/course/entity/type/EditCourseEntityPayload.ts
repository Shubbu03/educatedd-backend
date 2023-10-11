import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type EditCourseEntityPayload = {
    title?:string,
    description?:string,
    chapter?:string,
    metadata?:FileMetadata
}