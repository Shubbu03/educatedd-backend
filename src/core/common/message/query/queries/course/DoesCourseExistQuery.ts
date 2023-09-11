import { RepositoryFindOptions } from "@core/common/persistence/RepositoryOptions";

export class DoesCourseExistQuery {
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
  ): DoesCourseExistQuery {
    return new DoesCourseExistQuery(by, options);
  }
}
