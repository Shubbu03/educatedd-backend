import { CourseType } from "@core/common/enums/CourseEnums";

export interface CreateCoursePort {
  executorId: string;
  courseId: string;
  name: string;
  type: CourseType;
  file: Buffer | NodeJS.ReadableStream;
}
