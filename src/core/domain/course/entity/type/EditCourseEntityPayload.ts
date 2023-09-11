import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type EditCourseEntityPayload = {
    name?:string,
    metadata?:FileMetadata
}