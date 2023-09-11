import { GetCoursePreviewQuery } from '@core/common/message/query/queries/course/GetCoursePreviewQuery';
import { GetCoursePreviewQueryResult } from '@core/common/message/query/queries/course/result/GetCoursePreviewQueryResult';
import { QueryHandler } from '@core/common/message/query/QueryHandler';
import { Optional } from '@core/common/type/CommonTypes';

export interface GetCoursePreviewQueryHandler extends QueryHandler<GetCoursePreviewQuery, Optional<GetCoursePreviewQueryResult>> {}
