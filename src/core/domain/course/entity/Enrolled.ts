import { Entity } from "@core/common/entity/Entity";
import { RemovableEntity } from "@core/common/entity/RemovableEntity";
import { Nullable } from "@core/common/type/CommonTypes";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";
import { EnrolledCourseEntityPayload } from "./type/EnrolledCourseEntityPayload";
import { EditCompleteEntityPayload } from "./type/EditCompleteEntityPayload";

export class Enrolled extends Entity<string> implements RemovableEntity {
  @IsUUID()
  private readonly ownerId: string;

  @IsString()
  private courseID: string;

  @IsUUID()
  private userID: string;

  @IsString()
  private chapter: string;

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
    this.chapter = payload.chapter;

    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getOwnerId(): string {
    console.log("OWNERID ISS::", this.ownerId);
    return this.ownerId;
  }

  public getCourseID(): string {
    return this.courseID;
  }

  public getUserID(): string {
    console.log("OWNERID ISS::", this.userID);
    return this.userID;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getEditedAt(): Nullable<Date> {
    return this.editedAt;
  }

  public getChapter(): string {
    return this.chapter;
  }

  public getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public static async new(
    payload: EnrolledCourseEntityPayload
  ): Promise<Enrolled> {
    const course: Enrolled = new Enrolled(payload);
    await course.validate();

    return course;
  }

  public async edit_complete(
    payload: EditCompleteEntityPayload
  ): Promise<void> {
    const currentDate: Date = new Date();
    if (payload.chapterCompleted) {
      console.log("ONLY THIS GETTING PRINTED FROM edit_complete:::::",)
      this.chapter = payload.chapterCompleted;
      this.courseID = payload.courseID;
      this.userID = payload.id;
      this.editedAt = currentDate;
    }
  }
}
