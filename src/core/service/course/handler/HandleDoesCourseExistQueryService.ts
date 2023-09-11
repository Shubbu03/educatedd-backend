import { DoesCourseExistQuery } from '@core/common/message/query/queries/course/DoesCourseExistQuery';
import { DoesCourseExistQueryResult } from '@core/common/message/query/queries/course/result/DoesCourseExistQueryResult';
import { DoesCourseExistQueryHandler } from '@core/domain/course/handler/DoesCourseExistQueryHandler';
import { CourseRepositoryPort } from '@core/domain/course/port/persistence/CourseRepositoryPort';

export class HandleDoesCourseExistQueryService implements DoesCourseExistQueryHandler {
  
  constructor(
    private readonly mediaRepository: CourseRepositoryPort,
  ) {}

  public async handle(query: DoesCourseExistQuery): Promise<DoesCourseExistQueryResult> {
    const count: number = await this.mediaRepository.countCourses(query.by);
    return DoesCourseExistQueryResult.new(!!count);
  }
  
}
