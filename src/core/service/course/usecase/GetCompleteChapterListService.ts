import { Exception } from "@core/common/exception/Exception";
import { CoreAssert } from "@core/common/util/assert/CoreAssert";
import { Course } from "@core/domain/course/entity/Course";
import { Enrolled } from "@core/domain/course/entity/Enrolled";
import {
  CourseRepositoryPort,
  EnrolledCourseRepositoryPort,
} from "@core/domain/course/port/persistence/CourseRepositoryPort";
import { GetEnrolledCourseListPort } from "@core/domain/course/port/usecase/GetEnrolledCourseListPort";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { GetEnrolledCourseListUseCase } from "@core/domain/course/usecase/GetEnrolledCourseListUseCase";
import { Code } from "@core/common/code/Code";
import { GetCompleteChapterListUseCase } from "@core/domain/course/usecase/GetCompleteChapterListUseCase";
import { GetCompleteChapterListPort } from "@core/domain/course/port/usecase/GetCompleteChapterListPort";

export class GetCompleteChapterListService
  implements GetCompleteChapterListUseCase
{
  constructor(
    private readonly enrolledCourseListRepository: EnrolledCourseRepositoryPort
  ) {}

  //   public async execute(
  //     payload: GetCompleteChapterListPort
  //   ): Promise<CourseUseCaseDto[]> {
  //     const enrolledInCourse: Enrolled[] = CoreAssert.notEmpty(
  //       await this.enrolledCourseListRepository.findCompleteChapter({
  //         // userID: payload.executorId,
  //       }),
  //       Exception.new({
  //         code: Code.ENTITY_NOT_FOUND_ERROR,
  //         overrideMessage: "Course not found.",
  //       })
  //     );
  //     console.log("ENTERED THE GetEnrolledCourseListService!!!!")

  //     return CourseUseCaseDto.newEnrolledCourseListFromCourses(enrolledInCourse);
  //   }
  public async execute(
    payload: GetCompleteChapterListPort
  ): Promise<CourseUseCaseDto[]> {
    const courses: Enrolled[] = await this.enrolledCourseListRepository.findCompleteChapter();
    return CourseUseCaseDto.newCompleteChapterList(courses);
  }
}
