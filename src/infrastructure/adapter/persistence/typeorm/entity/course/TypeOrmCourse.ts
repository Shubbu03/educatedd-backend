import { CourseType } from "@core/common/enums/CourseEnums";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("course")
export class TypeOrmCourse {
  @Column()
  public id: string;

  @Column()
  public ownerId: string;

  @PrimaryColumn()
  public courseId: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public pdfDetails: string;

  @Column('jsonb', { nullable: true })
  public keywords: string[];

  @Column()
  public type: CourseType;

  @Column()
  public relativePath: string;

  @Column()
  public size: number;

  @Column()
  public ext: string;

  @Column()
  public mimetype: string;

  @Column()
  public createdAt: Date;

  @Column()
  public editedAt: Date;

  @Column()
  public removedAt: Date;
}
