import { Exception } from "@core/common/exception/Exception";
import { CoreAssert } from "@core/common/util/assert/CoreAssert";
import { Course } from "@core/domain/course/entity/Course";
import { Enrolled } from "@core/domain/course/entity/Enrolled";
import { CourseRepositoryPort } from "@core/domain/course/port/persistence/CourseRepositoryPort";
import { GetEnrolledCourseListPort } from "@core/domain/course/port/usecase/GetEnrolledCourseListPort";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { GetEnrolledCourseListUseCase } from "@core/domain/course/usecase/GetEnrolledCourseListUseCase";
import { Code } from "@core/common/code/Code";

export class GetEnrolledCourseListService
  implements GetEnrolledCourseListUseCase
{
  constructor(
    private readonly enrolledCourseListRepository: CourseRepositoryPort
  ) {}

  public async execute(
    payload: GetEnrolledCourseListPort
  ): Promise<CourseUseCaseDto[]> {
    const enrolledInCourse: Course[] = CoreAssert.notEmpty(
      await this.enrolledCourseListRepository.findEnrolledCourses({
        userID: payload.executorId,
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: "Course not found.",
      })
    );
    console.log("ENTERED THE GetEnrolledCourseListService!!!!")

    return CourseUseCaseDto.newEnrolledCourseListFromCourses(enrolledInCourse);
  }
}
