import { Entity } from "@core/common/entity/Entity";
import { RemovableEntity } from "@core/common/entity/RemovableEntity";
import { CourseType } from "@core/common/enums/CourseEnums";
import { Nullable } from "@core/common/type/CommonTypes";
import { CreateCourseEntityPayload } from "./type/CreateCourseEntityPayload";
import { EditCourseEntityPayload } from "./type/EditCourseEntityPayload";
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

export class Course extends Entity<string> implements RemovableEntity {
  @IsUUID()
  private readonly ownerId: string;

  @IsUUID()
  private readonly courseId: string;

  @IsString()
  private title: string;

  @IsString()
  private readonly description: string;

  @IsString()
  private readonly pdfDetails: string;

  @IsString()
  private readonly keywords: string[];

  @IsEnum(CourseType)
  private readonly type: CourseType;

  @IsInstance(FileMetadata)
  private metadata: FileMetadata;

  @IsOptional()
  @IsUUID()
  readonly id: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private editedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: CreateCourseEntityPayload) {
    super();

    this.ownerId = payload.ownerId;
    this.courseId = payload.courseId;
    this.title = payload.title;
    this.description = payload.description;
    this.pdfDetails = payload.pdfDetails;
    this.keywords = payload.keywords;
    this.type = payload.type;
    this.metadata = payload.metadata;

    this.id = payload.id || v4();
    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getCourseId(): string {
    return this.courseId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPdfDescription(): string {
    return this.pdfDetails;
  }

  public getKeywords(): string[] {
    return this.keywords;
  }

  public getType(): CourseType {
    return this.type;
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

  public async edit(payload: EditCourseEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.name) {
      this.title = payload.name;
      this.editedAt = currentDate;
    }
    if (payload.metadata) {
      this.metadata = payload.metadata;
      this.editedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public static async new(payload: CreateCourseEntityPayload): Promise<Course> {
    const course: Course = new Course(payload);
    await course.validate();

    return course;
  }
}