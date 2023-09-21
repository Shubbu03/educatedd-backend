import { RepositoryFindOptions } from "@core/common/persistence/RepositoryOptions";

export class DoesCourseExistQuery {
  by: {ownerId?: string; id?: string };

  options?: RepositoryFindOptions;

  private constructor(
    by: { id?: string; ownerId?: string;},
    options?: RepositoryFindOptions
  ) {
    this.by = by;
    this.options = options;
  }

  public static new(
    by: { id?: string; ownerId?: string; },
    options?: RepositoryFindOptions
  ): DoesCourseExistQuery {
    return new DoesCourseExistQuery(by, options);
  }
}
