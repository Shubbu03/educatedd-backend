import { RepositoryFindOptions } from "@core/common/persistence/RepositoryOptions";

export class GetCoursePreviewQuery {
  by: { id?: string; ownerId?: string; courseId?: string };

  options?: RepositoryFindOptions;

  private constructor(
    by: { id?: string; ownerId?: string; courseId?: string },
    options?: RepositoryFindOptions
  ) {
    this.by = by;
    this.options = options;
  }

  public static new(
    by: { id?: string; ownerId?: string; courseId?: string },
    options?: RepositoryFindOptions
  ): GetCoursePreviewQuery {
    return new GetCoursePreviewQuery(by, options);
  }
}
