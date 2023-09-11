import { GetCoursePreviewQuery } from '@core/common/message/query/queries/course/GetCoursePreviewQuery';
import { GetCoursePreviewQueryResult } from '@core/common/message/query/queries/course/result/GetCoursePreviewQueryResult';
import { Optional } from '@core/common/type/CommonTypes';
import { Course } from '@core/domain/course/entity/Course';
import { GetCoursePreviewQueryHandler } from '@core/domain/course/handler/GetCoursePreviewQueryHandler';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';

export class HandleGetCoursePreviewQueryService implements GetCoursePreviewQueryHandler {
  
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
  ) {}

  public async handle(query: GetCoursePreviewQuery): Promise<Optional<GetCoursePreviewQueryResult>> {
    let queryResult: Optional<GetCoursePreviewQueryResult>;
    
    const course: Optional<Course> = await this.courseRepository.findCourse(query.by);
    if (course) {
      queryResult = GetCoursePreviewQueryResult.new(course.getId(), course.getType(), course.getMetadata().relativePath);
    }
    
    return queryResult;
  }
  
}
