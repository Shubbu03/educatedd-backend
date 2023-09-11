import { DoesCourseExistQuery } from '@core/common/message/query/queries/course/DoesCourseExistQuery';
import { DoesCourseExistQueryResult } from '@core/common/message/query/queries/course/result/DoesCourseExistQueryResult';
import { CourseDITokens } from '@core/domain/course/di/CourseDITokens';
import { DoesCourseExistQueryHandler } from '@core/domain/course/handler/DoesCourseExistQueryHandler';
import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@Injectable()
@QueryHandler(DoesCourseExistQuery)
export class NestWrapperDoesCourseExistQueryHandler implements IQueryHandler {
  
  constructor(
    @Inject(CourseDITokens.DoesCourseExistQueryHandler)
    private readonly handleService: DoesCourseExistQueryHandler
  ) {}

  public async execute(query: DoesCourseExistQuery): Promise<DoesCourseExistQueryResult> {
    return this.handleService.handle(query);
  }
  
}
