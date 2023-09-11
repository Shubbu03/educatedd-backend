import { GetCoursePreviewQuery } from '@core/common/message/query/queries/course/GetCoursePreviewQuery';
import { GetCoursePreviewQueryResult } from '@core/common/message/query/queries/course/result/GetCoursePreviewQueryResult';
import { Optional } from '@core/common/type/CommonTypes';
import { CourseDITokens } from '@core/domain/course/di/CourseDITokens';
import { GetCoursePreviewQueryHandler } from '@core/domain/course/handler/GetCoursePreviewQueryHandler';
import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@Injectable()
@QueryHandler(GetCoursePreviewQuery)
export class NestWrapperGetCoursePreviewQueryHandler implements IQueryHandler {
  
  constructor(
    @Inject(CourseDITokens.GetCoursePreviewQueryHandler)
    private readonly handleService: GetCoursePreviewQueryHandler
  ) {}

  public async execute(query: GetCoursePreviewQuery): Promise<Optional<GetCoursePreviewQueryResult>> {
    return this.handleService.handle(query);
  }
  
}
