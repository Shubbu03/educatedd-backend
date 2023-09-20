import { Entity } from "@core/common/entity/Entity";
import { RemovableEntity } from "@core/common/entity/RemovableEntity";
import { Nullable } from "@core/common/type/CommonTypes";
import { FileMetadata } from "@core/domain/media/value-object/FileMetadata";
import {
  IsDate,
  IsEnum,
  IsInstance,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { v4 } from "uuid";
import { UploadFileEntityPayload } from "./type/UploadFileEntityPayload";

export class UploadFile extends Entity<string> implements RemovableEntity {
  @IsString()
  private readonly pdfDetail: string;

  @IsInstance(FileMetadata)
  private metadata: FileMetadata;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private editedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: UploadFileEntityPayload) {
    super();

    // this.pdfDetail = payload.file;
    this.metadata = payload.metadata;

    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getPdfDescription(): string {
    return this.pdfDetail;
  }

  public getMetadata(): FileMetadata {
    return this.metadata;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getEditedAt(): Nullable<Date> {
    return this.editedAt;
  }

  public getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  public static async new(
    payload: UploadFileEntityPayload
  ): Promise<UploadFile> {
    const course: UploadFile = new UploadFile(payload);
    // await course.validate();

    return course;
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }
}
