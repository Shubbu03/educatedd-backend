import { Course } from "@core/domain/course/entity/Course";
import { Enrolled } from "@core/domain/course/entity/Enrolled";
// import { CourseFileStoragePort } from "@core/domain/course/port/persistence/CourseFileStoragePort";
import {
  CourseRepositoryPort,
//   EnrolledCourseRepositoryPort,
} from "@core/domain/course/port/persistence/CourseRepositoryPort";
// import { CreateCoursePort } from "@core/domain/course/port/usecase/CreateCoursePort";
import { EnrolledCoursePort } from "@core/domain/course/port/usecase/EnrolledCoursePort";
import { EnrolledCourseUseCase } from "@core/domain/course/usecase/EnrolledCourseUseCase";
// import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
// import { FileMetadata } from "@core/domain/media/value-object/FileMetadata";
// import { v4 as uuidv4 } from "uuid";

export class EnrolledCourseService implements EnrolledCourseUseCase {
  constructor(
    private readonly enrolledCourseRepository: CourseRepositoryPort 
  ) {}

  public async execute(payload: EnrolledCoursePort): Promise<boolean> {
    const enrolledCourse: Enrolled = await Enrolled.new({
      ownerId: payload.executorId,
      courseID: payload.courseId,
      userID: payload.userId
    });

    console.log(
      "NEWLY added course from EnrolledCourseService.ts is::",
      enrolledCourse
    );

    await this.enrolledCourseRepository.enrolledCourse(enrolledCourse);

    return true;

    // return CourseUseCaseDto.enrolledCourse(enrolledCourse);
  }
}
