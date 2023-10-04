import { Entity } from "@core/common/entity/Entity";
import { RemovableEntity } from "@core/common/entity/RemovableEntity";
import { Nullable } from "@core/common/type/CommonTypes";
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { EnrolledCourseEntityPayload } from "./type/EnrolledCourseEntityPayload";

export class Enrolled extends Entity<string> implements RemovableEntity {
  @IsUUID()
  private readonly ownerId: string;

  @IsString()
  private courseID: string;

  @IsUUID()
  private userID: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private editedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: EnrolledCourseEntityPayload) {
    super();

    this.ownerId = payload.ownerId;
    this.courseID = payload.courseID;
    this.userID = payload.userID;
    
    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getCourseID(): string {
    return this.courseID;
  }

  public getUserID(): string {
    return this.userID;
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

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public static async new(payload: EnrolledCourseEntityPayload): Promise<Enrolled> {
    const course: Enrolled = new Enrolled(payload);
    await course.validate();

    return course;
  }
}
