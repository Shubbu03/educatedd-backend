export class CourseDITokens {

    // Use-cases
  
  public static readonly CreateCourseUseCase: unique symbol  = Symbol('CreateCourseUseCase');
  public static readonly UploadFileUseCase: unique symbol  = Symbol('UploadFileUseCase');
  public static readonly EditCourseUseCase: unique symbol    = Symbol('EditCourseUseCase');
  public static readonly EnrolledCourseUseCase: unique symbol    = Symbol('EnrolledCourseUseCase');
  public static readonly GetEnrolledCourseListUseCase: unique symbol    = Symbol('GetEnrolledCourseListUseCase');
  public static readonly EditCompleteUseCase: unique symbol = Symbol('EditCompleteUseCase');
  public static readonly GetCourseListUseCase: unique symbol = Symbol('GetCourseListUseCase');
  public static readonly GetCourseUseCase: unique symbol     = Symbol('GetCourseUseCase');
  public static readonly GetCompleteChapterListUseCase: unique symbol     = Symbol('GetCompleteChapterListUseCase');
  public static readonly RemoveCourseUseCase: unique symbol  = Symbol('RemoveCourseUseCase');
  
  // Handlers
  
  public static readonly DoesCourseExistQueryHandler: unique symbol = Symbol('DoesCourseExistQueryHandler');
  public static readonly GetCoursePreviewQueryHandler: unique symbol = Symbol('GetCoursePreviewQueryHandler');
  
  // Repositories
  
  public static readonly CourseRepository: unique symbol  = Symbol('CourseRepository');
  public static readonly CompleteCourseRepository: unique symbol  = Symbol('CompleteCourseRepository');
  public static readonly CourseFileStorage: unique symbol = Symbol('CourseFileStorage');
}