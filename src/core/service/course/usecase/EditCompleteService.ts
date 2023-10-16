import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { CoreAssert } from "@core/common/util/assert/CoreAssert";
import { Course } from "@core/domain/course/entity/Course";
import { Enrolled } from "@core/domain/course/entity/Enrolled";
import {
  CourseRepositoryPort,
  EnrolledCourseRepositoryPort,
} from "@core/domain/course/port/persistence/CourseRepositoryPort";
import { EditCompletePort } from "@core/domain/course/port/usecase/EditCompletePort";
import { EditCoursePort } from "@core/domain/course/port/usecase/EditCoursePort";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { EditCompleteUseCase } from "@core/domain/course/usecase/EditCompleteUseCase";
import { EditCourseUseCase } from "@core/domain/course/usecase/EditCourseUseCase";

export class EditCompleteService implements EditCompleteUseCase {
  constructor(
    private readonly courseRepository: EnrolledCourseRepositoryPort
  ) {}

  public async execute(payload: EditCompletePort): Promise<CourseUseCaseDto> {
    const enroll: Enrolled = CoreAssert.notEmpty(
      await this.courseRepository.findCompleteCourse({
        courseID: payload.courseId,
        id: payload.executorId,
        completedchapter: payload.chapterCompleted,
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: "Course not found.",
      })
    );

    // const hasAccess: boolean = payload.executorId === enroll.getUserID();

    // // const hasAccess: boolean = true;

    // console.log("ACCESS IS::",enroll.getOwnerId(),hasAccess)
    // CoreAssert.isTrue(
    //   hasAccess,
    //   Exception.new({ code: Code.ACCESS_DENIED_ERROR })
    // );

    await enroll.edit_complete({
      courseID: payload.courseId,
      chapterCompleted: payload.chapterCompleted,
      id: payload.executorId,
    });
    // await this.courseRepository.updateCourse(course);
    console.log("BEFORE THE UPDATE COMPLETE IN EDIT COMPLETE SERVICE", enroll);
    await this.courseRepository.update_complete(enroll);

    console.log("AFTER THE UPDATE COMPLETE IN EDIT COMPLETE SERVICE", enroll);

    return CourseUseCaseDto.newFromCompleteCourse(enroll);
  }
}
