import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';

export type UploadFileEntityPayload = {
    // file:Buffer|string,
    metadata: FileMetadata,
    createdAt?: Date,
    editedAt?: Date,
    removedAt?: Date,
}