import { Course } from "@core/domain/course/entity/Course";
import { User } from "@core/domain/user/entity/User";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity("enrolled_course")
export class TypeOrmEnrolledCourse{
    @Column()
    public courseID: string;

    @PrimaryColumn()
    public id: string;

    @Column()
    public userID: string;

    @Column()
    public completedchapter: string;

    // @ManyToMany(() => Course, (course) => course.getOwnerId)
    // @JoinTable()
    // courses: Course[]

//     @ManyToMany(() => User)
//     @JoinTable()
//     _userID: User[]
}