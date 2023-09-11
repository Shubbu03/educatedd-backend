import { DoesCourseExistQuery } from '@core/common/message/query/queries/course/DoesCourseExistQuery';
import { DoesCourseExistQueryResult } from '@core/common/message/query/queries/course/result/DoesCourseExistQueryResult';
import { QueryHandler } from '@core/common/message/query/QueryHandler';

export interface DoesCourseExistQueryHandler extends QueryHandler<DoesCourseExistQuery, DoesCourseExistQueryResult> {}
