import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type EditCompleteEntityPayload = {
    courseID: string,
    id:string,
    chapterCompleted?:string,
    metadata?:FileMetadata
}