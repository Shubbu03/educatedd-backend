import { RepositoryFindOptions, RepositoryRemoveOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/type/CommonTypes';
import { Course } from '@core/domain/course/entity/Course';

export interface CourseRepositoryPort {

  findCourse(by: {id?: string}, options?: RepositoryFindOptions): Promise<Optional<Course>>;
  
  findCourses(by: {ownerId?: string}, options?: RepositoryFindOptions): Promise<Course[]>;
  
  countCourses(by: {id?: string, ownerId?: string}, options?: RepositoryFindOptions): Promise<number>;
  
  addCourse(media: Course): Promise<{id: string}>;
  
  updateCourse(media: Course): Promise<void>;
  
  removeCourse(media: Course, options?: RepositoryRemoveOptions): Promise<void>;

}
