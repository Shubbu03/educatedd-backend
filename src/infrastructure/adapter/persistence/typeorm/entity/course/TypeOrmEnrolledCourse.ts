import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("enrolled_course")
export class TypeOrmEnrolledCourse{
    @Column()
    public courseID: string;

    @PrimaryColumn()
    public id: string;
}