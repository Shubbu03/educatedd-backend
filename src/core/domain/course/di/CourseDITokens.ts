export class CourseDITokens {

    // Use-cases
  
  public static readonly CreateCourseUseCase: unique symbol  = Symbol('CreateCourseUseCase');
  public static readonly EditCourseUseCase: unique symbol    = Symbol('EditCourseUseCase');
  public static readonly GetCourseListUseCase: unique symbol = Symbol('GetCourseListUseCase');
  public static readonly GetCourseUseCase: unique symbol     = Symbol('GetCourseUseCase');
  public static readonly RemoveCourseUseCase: unique symbol  = Symbol('RemoveCourseUseCase');
  
  // Handlers
  
  public static readonly DoesCourseExistQueryHandler: unique symbol = Symbol('DoesCourseExistQueryHandler');
  public static readonly GetCoursePreviewQueryHandler: unique symbol = Symbol('GetCoursePreviewQueryHandler');
  
  // Repositories
  
  public static readonly CourseRepository: unique symbol  = Symbol('CourseRepository');
  public static readonly CourseFileStorage: unique symbol = Symbol('CourseFileStorage');
}