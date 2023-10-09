import { UserRole } from "@core/common/enums/UserEnums";
import { Enrolled } from "@core/domain/course/entity/Enrolled";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity("user")
export class TypeOrmUser {
  @PrimaryColumn()
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public email: string;

  @Column()
  public role: UserRole;

  @Column()
  public password: string;

  @Column()
  public createdAt: Date;

  @Column()
  public editedAt: Date;

  @Column()
  public removedAt: Date;

  // @ManyToMany(() => Enrolled)
  // @JoinTable()
  // userID: Enrolled[];
}
