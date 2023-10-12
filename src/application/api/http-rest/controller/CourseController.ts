import { HttpAuth } from "@application/api/http-rest/auth/decorator/HttpAuth";
import { HttpUser } from "@application/api/http-rest/auth/decorator/HttpUser";
import {
  HttpRequestWithUser,
  HttpUserPayload,
} from "@application/api/http-rest/auth/type/HttpAuthTypes";
import { HttpRestApiModelCreateCourseBody } from "@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseBody";
import { HttpRestApiModelCreateCourseQuery } from "@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseQuery";
import { HttpRestApiModelEditCourseBody } from "@application/api/http-rest/controller/documentation/course/HttpRestApiModelEditCourseBody";
import { HttpRestApiResponseCourse } from "@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCourse";
import { HttpRestApiResponseCourseList } from "@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCourseList";
import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { CourseType } from "@core/common/enums/CourseEnums";
import { UserRole } from "@core/common/enums/UserEnums";
import { CourseDITokens } from "@core/domain/course/di/CourseDITokens";
import { CreateCourseUseCase } from "@core/domain/course/usecase/CreateCourseUseCase";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { EditCourseUseCase } from "@core/domain/course/usecase/EditCourseUseCase";
import { GetCourseListUseCase } from "@core/domain/course/usecase/GetCourseListUseCase";
import { GetEnrolledCourseListUseCase } from "@core/domain/course/usecase/GetEnrolledCourseListUseCase";
import { GetCourseUseCase } from "@core/domain/course/usecase/GetCourseUseCase";
import { RemoveCourseUseCase } from "@core/domain/course/usecase/RemoveCourseUseCase";
import { UploadFileUseCase } from "@core/domain/course/usecase/UploadFileUseCase";
import { CreateCourseAdapter } from "@infrastructure/adapter/usecase/course/CreateCourseAdapter";
import { EditCourseAdapter } from "@infrastructure/adapter/usecase/course/EditCourseAdapter";
import { GetCourseAdapter } from "@infrastructure/adapter/usecase/course/GetCourseAdapter";
import { GetCourseListAdapter } from "@infrastructure/adapter/usecase/course/GetCourseListAdapter";
import { RemoveCourseAdapter } from "@infrastructure/adapter/usecase/course/RemoveCourseAdapter";
import { FileStorageConfig } from "@infrastructure/config/FileStorageConfig";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { query, request } from "express";
import { parse } from "path";
import { resolve } from "url";
import { HttpRestApiModelUploadFile } from "./documentation/course/HttpRestApiModelUploadFile";
import {
  NewUploadFileAdapter,
  UploadFileAdapter,
} from "@infrastructure/adapter/usecase/course/UploadFileAdapter";
import { v4 } from "uuid";
import { NewUploadFilePort } from "@core/domain/course/port/usecase/NewUploadFilePort";
import { HttpRestApiResponseEnrolledCourse } from "./documentation/course/HttpRestApiResponseEnrolledCourse";
import { HttpRestApiModelEnrolledCourseQuery } from "./documentation/course/HttpRestApiModelEnrolledCourseQuery";
import { EnrolledCourseAdapter } from "@infrastructure/adapter/usecase/course/EnrolledCourseAdapter";
import { EnrolledCourseUseCase } from "@core/domain/course/usecase/EnrolledCourseUseCase";
import { HttpRestApiResponseEnrolledCourseList } from "./documentation/course/HttpRestApiResponseEnrolledCourseList";
import { GetEnrolledCourseListAdapter } from "@infrastructure/adapter/usecase/course/GetEnrolledCourseListAdapter";
import { HttpRestApiModelEditCompletedCourseBody } from "./documentation/course/HttpRestApiModelEditCompletedCourseBody";
import { HttpRestApiModelCompletedChapterQuery } from "./documentation/course/HttpRestApiModelCompletedChapterQuery";
import { EditCompleteUseCase } from "@core/domain/course/usecase/EditCompleteUseCase";
import { CompletedChapterAdapter } from "@infrastructure/adapter/usecase/course/CompletedChapterAdapter";

@Controller("courses")
@ApiTags("courses")
export class CourseController {
  constructor(
    @Inject(CourseDITokens.CreateCourseUseCase)
    private readonly createCourseUseCase: CreateCourseUseCase,

    @Inject(CourseDITokens.UploadFileUseCase)
    private readonly uploadFileUseCase: UploadFileUseCase,

    @Inject(CourseDITokens.EditCourseUseCase)
    private readonly editCourseUseCase: EditCourseUseCase,

    @Inject(CourseDITokens.EnrolledCourseUseCase)
    private readonly enrolledCourseUseCase: EnrolledCourseUseCase,

    @Inject(CourseDITokens.GetEnrolledCourseListUseCase)
    private readonly getEnrolledCourseListUseCase: GetEnrolledCourseListUseCase,

    @Inject(CourseDITokens.EditCompleteUseCase)
    private readonly getEditCompleteUseCase: EditCompleteUseCase,

    @Inject(CourseDITokens.GetCourseListUseCase)
    private readonly getCourseListUseCase: GetCourseListUseCase,

    @Inject(CourseDITokens.GetCourseUseCase)
    private readonly getCourseUseCase: GetCourseUseCase,

    @Inject(CourseDITokens.RemoveCourseUseCase)
    private readonly removeCourseUseCase: RemoveCourseUseCase
  ) {}

  @Post()
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  // @ApiBody({ type: HttpRestApiModelCreateCourseBody })
  @ApiQuery({ name: "chapter", type: "string", required: true })
  @ApiQuery({ name: "pdfDetails", type: "string", required: true })
  @ApiQuery({ name: "Description", type: "string", required: true })
  @ApiQuery({ name: "Title", type: "string", required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async createCourse(
    @Req() request: HttpRequestWithUser,
    @Query() query: HttpRestApiModelCreateCourseQuery
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: CreateCourseAdapter = await CreateCourseAdapter.new({
      executorId: request.user.id,
      // courseId: request.user.id,
      title: query.Title,
      description: query.Description,
      pdfDetails: query.pdfDetails,
      chapter: query.chapter,
      // keywords: [query.Keywords],
    });

    console.log("create course adapter from CourseController.ts is::", adapter);

    console.log("query iss::", query);

    const createdCourse: CourseUseCaseDto =
      await this.createCourseUseCase.execute(adapter);

    this.setFileStorageBasePath([createdCourse]);

    return CoreApiResponse.success(createdCourse);
  }

  @Post("/upload")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: HttpRestApiModelUploadFile })
  @ApiQuery({ name: "file", type: "string", required: false })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiModelUploadFile })
  public async uploadFile(
    @Req() request: HttpRequestWithUser,
    @UploadedFile() file: MulterFile
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    console.log("Complete request from CourseController.ts is:", request);

    const upload_adapter: NewUploadFileAdapter = await NewUploadFileAdapter.new(
      {
        name: parse(file.originalname).name,
        url: request.route.path,
        file: file.buffer,
      }
    );

    const uploadedFile: CourseUseCaseDto = await this.uploadFileUseCase.execute(
      upload_adapter
    );

    return CoreApiResponse.success(uploadedFile);
  }

  @Put(":id")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelEditCourseBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async editCourse(
    @HttpUser() user: HttpUserPayload,
    @Body() body: HttpRestApiModelEditCourseBody,
    @Param("id") id: string
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: EditCourseAdapter = await EditCourseAdapter.new({
      executorId: user.id,
      id: id,
      title: body.title,
      description: body.description,
      chapter: body.chapter,
    });

    const editedCourse: CourseUseCaseDto = await this.editCourseUseCase.execute(
      adapter
    );
    this.setFileStorageBasePath([editedCourse]);

    return CoreApiResponse.success(editedCourse);
  }

  @Post("/enrolled")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiQuery({ name: "CourseID", type: "string", required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HttpRestApiResponseEnrolledCourse,
  })
  public async enrolledCourse(
    @Req() request: HttpRequestWithUser,
    @Query() query: HttpRestApiModelEnrolledCourseQuery
  ): Promise<CoreApiResponse<boolean>> {
    const id = v4();
    const adapter: EnrolledCourseAdapter = await EnrolledCourseAdapter.new({
      // executorId: request.user.id,
      // executorId: id,
      courseId: query.CourseID,
      userId: request.user.id,
      chapter: query.chapter,
    });

    // console.log("Complete REQUEST from enrolled is::",request)
    console.log("ADAPTER FROM ENROLLED COURSE IS:::::", adapter);

    const enrolledCourse: boolean = await this.enrolledCourseUseCase.execute(
      adapter
    );

    return CoreApiResponse.success(enrolledCourse);
  }

  @Get()
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourseList })
  public async getCourseList(
    @HttpUser() user: HttpUserPayload
  ): Promise<CoreApiResponse<CourseUseCaseDto[]>> {
    const adapter: GetCourseListAdapter = await GetCourseListAdapter.new({
      executorId: user.id,
    });
    const courses: CourseUseCaseDto[] = await this.getCourseListUseCase.execute(
      adapter
    );
    this.setFileStorageBasePath(courses);

    console.log("Adapter from get list is::", adapter);

    return CoreApiResponse.success(courses);
  }

  @Get(":id")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async getCourse(
    @HttpUser() user: HttpUserPayload,
    @Param("id") id: string
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: GetCourseAdapter = await GetCourseAdapter.new({
      executorId: user.id,
      id: id,
    });

    const course: CourseUseCaseDto = await this.getCourseUseCase.execute(
      adapter
    );

    console.log("Adapter from get by id is::", adapter);

    return CoreApiResponse.success(course);
  }

  @Get("/enrolled/user")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: HttpRestApiResponseEnrolledCourseList,
  })
  public async getEnrolledCourseList(
    @HttpUser() user: HttpUserPayload
  ): Promise<CoreApiResponse<CourseUseCaseDto[]>> {
    const adapter: GetEnrolledCourseListAdapter =
      await GetEnrolledCourseListAdapter.new({
        executorId: user.id,
        // title:,
        // description:,
        // isEnrolled:
      });

    const enrolled: CourseUseCaseDto[] =
      await this.getEnrolledCourseListUseCase.execute(adapter);
    console.log("ADAPTER FROM GET ENROLLED ISS::", adapter);

    return CoreApiResponse.success(enrolled);
  }

  @Put("/enrolled/:id")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelEditCompletedCourseBody })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HttpRestApiResponseEnrolledCourse,
  })
  public async completedCourse(
    @HttpUser() user: HttpUserPayload,
    // @Req() request: HttpRequestWithUser,
    @Query() query: HttpRestApiModelCompletedChapterQuery
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: CompletedChapterAdapter = await CompletedChapterAdapter.new({
      executorId: user.id,
      courseId: query.CourseID,
      chapterCompleted: query.chapterCompleted,
    });

    const enrolledCourse: CourseUseCaseDto =
      await this.getEditCompleteUseCase.execute(adapter);

    return CoreApiResponse.success(enrolledCourse);
  }

  @Delete(":id")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async removeCourse(
    @HttpUser() user: HttpUserPayload,
    @Param("id") id: string
  ): Promise<CoreApiResponse<void>> {
    const adapter: RemoveCourseAdapter = await RemoveCourseAdapter.new({
      executorId: user.id,
      id: id,
    });
    await this.removeCourseUseCase.execute(adapter);

    return CoreApiResponse.success();
  }

  private setFileStorageBasePath(courses: CourseUseCaseDto[]): void {
    // courses.forEach(
    //   (course: CourseUseCaseDto) =>
    //     // (course.url = resolve(FileStorageConfig.BASE_PATH, course.url))
    // );
  }

  private setUploadedFilePath(newfile: NewUploadFilePort[]): void {
    newfile.forEach(
      (file: NewUploadFilePort) =>
        (file.url = resolve(FileStorageConfig.BASE_PATH, file.url))
    );
  }
}

type MulterFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};
