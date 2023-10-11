import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { CoreAssert } from "@core/common/util/assert/CoreAssert";
import { Course } from "@core/domain/course/entity/Course";
import { CourseRepositoryPort } from "@core/domain/course/port/persistence/CourseRepositoryPort";
import { EditCoursePort } from "@core/domain/course/port/usecase/EditCoursePort";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { EditCourseUseCase } from "@core/domain/course/usecase/EditCourseUseCase";

export class EditCourseService implements EditCourseUseCase {
  constructor(private readonly courseRepository: CourseRepositoryPort) {}

  public async execute(payload: EditCoursePort): Promise<CourseUseCaseDto> {
    const course: Course = CoreAssert.notEmpty(
      await this.courseRepository.findCourse({ id: payload.id }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: "Course not found.",
      })
    );

    const hasAccess: boolean = payload.executorId === course.getOwnerId();
    CoreAssert.isTrue(
      hasAccess,
      Exception.new({ code: Code.ACCESS_DENIED_ERROR })
    );

    await course.edit({
      title: payload.title,
      description: payload.description,
      chapter: payload.chapter
    });
    await this.courseRepository.updateCourse(course);

    return CourseUseCaseDto.newFromCourse(course);
  }
}
