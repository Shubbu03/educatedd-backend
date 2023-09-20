import { CourseType } from "@core/common/enums/CourseEnums";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("course")
export class TypeOrmFile {

    @PrimaryColumn()
  public pdfDetails:string;



  @Column()
  public createdAt: Date;

  @Column()
  public editedAt: Date;

  @Column()
  public removedAt: Date;

}