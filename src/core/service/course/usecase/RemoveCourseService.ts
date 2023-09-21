import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CourseRemovedEvent } from '@core/common/message/event/events/course/CourseRemovedEvent';
import { EventBusPort } from '@core/common/port/message/EventBusPort';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { Course } from '@core/domain/course/entity/Course';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';
import { RemoveCoursePort } from '@core/domain/course/port/usecase/RemoveCoursePort';
import { RemoveCourseUseCase } from '@core/domain/course/usecase/RemoveCourseUseCase';

export class RemoveCourseService implements RemoveCourseUseCase {
  
  constructor(
    private readonly mediaRepository: CourseRepositoryPort,
    private readonly eventBus: EventBusPort,
  ) {}
  
  public async execute(payload: RemoveCoursePort): Promise<void> {
    const course: Course = CoreAssert.notEmpty(
      await this.mediaRepository.findCourse({id: payload.courseId}),
      Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Course not found.'})
    );
  
    const hasAccess: boolean = payload.executorId === course.getOwnerId();
    CoreAssert.isTrue(hasAccess, Exception.new({code: Code.ACCESS_DENIED_ERROR}));
    
    await this.mediaRepository.removeCourse(course);
    await this.eventBus.sendEvent(CourseRemovedEvent.new(course.getId(),course.getOwnerId()));
  }
  
}
