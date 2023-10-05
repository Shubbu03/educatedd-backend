import {
  RepositoryFindOptions,
  RepositoryRemoveOptions,
} from "@core/common/persistence/RepositoryOptions";
import { Optional } from "@core/common/type/CommonTypes";
import { Course } from "@core/domain/course/entity/Course";
import { UploadFile } from "../../entity/UploadFile";
import { Enrolled } from "../../entity/Enrolled";

export interface CourseRepositoryPort {
  findCourse(
    by: { id?: string },
    options?: RepositoryFindOptions
  ): Promise<Optional<Course>>;

  findCourses(
    // by: { ownerId?: string },
    options?: RepositoryFindOptions
  ): Promise<Course[]>;

  countCourses(
    by: { id?: string;},
    options?: RepositoryFindOptions
  ): Promise<number>;

  addCourse(media: Course): Promise<{ id: string }>;

  updateCourse(media: Course): Promise<void>;

  removeCourse(media: Course, options?: RepositoryRemoveOptions): Promise<void>;
  enrolledCourse(enrollCourse: Enrolled): Promise<{ enrolled: boolean }>;
}

export interface UploadNewFileRepositoryPort {
  uploadFile(media: UploadFile): Promise<{ url: string }>;
}

export interface EnrolledCourseRepositoryPort {
  enrolledCourse(enrollCourse: Enrolled): Promise<{ enrolled: boolean }>;
}
