import { HttpAuth } from "@application/api/http-rest/auth/decorator/HttpAuth";
import { HttpUser } from "@application/api/http-rest/auth/decorator/HttpUser";
import {
  HttpRequestWithUser,
  HttpUserPayload,
} from "@application/api/http-rest/auth/type/HttpAuthTypes";
import { HttpRestApiModelCreateCourseBody } from "@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseBody";
import { HttpRestApiModelCreateCourseQuery } from "@application/api/http-rest/controller/documentation/course/HttpRestApiModelCreateCourseQuery";
import { HttpRestApiModelEditCourseBody } from "@application/api/http-rest/controller/documentation/course/HttpRestApiModelEditCourseBody";
import { HttpRestApiResponseCourse } from "@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCOurse";
import { HttpRestApiResponseCourseList } from "@application/api/http-rest/controller/documentation/course/HttpRestApiResponseCourseList";
import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { CourseType } from "@core/common/enums/CourseEnums";
import { UserRole } from "@core/common/enums/UserEnums";
import { CourseDITokens } from "@core/domain/course/di/CourseDITokens";
import { CreateCourseUseCase } from "@core/domain/course/usecase/CreateCourseUseCase";
import { CourseUseCaseDto } from "@core/domain/course/usecase/dto/CourseUseCaseDto";
import { EditCourseUseCase } from "@core/domain/course/usecase/EditCourseUseCase";
import { GetCourseListUseCase } from "@core/domain/course/usecase/GetCourseListUseCase";
import { GetCourseUseCase } from "@core/domain/course/usecase/GetCourseUseCase";
import { RemoveCourseUseCase } from "@core/domain/course/usecase/RemoveCourseUseCase";
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
import { request } from "express";
import { parse } from "path";
import { resolve } from "url";

@Controller("courses")
@ApiTags("courses")
export class CourseController {
  constructor(
    @Inject(CourseDITokens.CreateCourseUseCase)
    private readonly createCourseUseCase: CreateCourseUseCase,

    @Inject(CourseDITokens.EditCourseUseCase)
    private readonly editCourseUseCase: EditCourseUseCase,

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
  @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: HttpRestApiModelCreateCourseBody })
  @ApiQuery({ name: "name", type: "string", required: false })
  @ApiQuery({ name: "type", enum: CourseType })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async createCourse(
    @Req() request: HttpRequestWithUser,
    @UploadedFile() file: MulterFile,
    @Query() query: HttpRestApiModelCreateCourseQuery
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: CreateCourseAdapter = await CreateCourseAdapter.new({
      executorId: request.user.id,
      courseId: request.user.id,
      name: query.name || parse(file.originalname).name,
      type: query.type,
      file: file.buffer,
    });

    const createdCourse: CourseUseCaseDto =
      await this.createCourseUseCase.execute(adapter);
    this.setFileStorageBasePath([createdCourse]);

    return CoreApiResponse.success(createdCourse);
  }

  @Put(":courseId")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelEditCourseBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async editCourse(
    @HttpUser() user: HttpUserPayload,
    @Body() body: HttpRestApiModelEditCourseBody,
    @Param("courseId") courseId: string
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: EditCourseAdapter = await EditCourseAdapter.new({
      executorId: user.id,
      courseId: courseId,
      name: body.name,
    });

    const editedCourse: CourseUseCaseDto = await this.editCourseUseCase.execute(
      adapter
    );
    this.setFileStorageBasePath([editedCourse]);

    return CoreApiResponse.success(editedCourse);
  }

  @Get()
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
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

    return CoreApiResponse.success(courses);
  }

  @Get(":courseId")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async getCourse(
    @HttpUser() user: HttpUserPayload,
    @Param("courseId") courseId: string
  ): Promise<CoreApiResponse<CourseUseCaseDto>> {
    const adapter: GetCourseAdapter = await GetCourseAdapter.new({
      executorId: user.id,
      courseId: courseId,
    });
    const course: CourseUseCaseDto = await this.getCourseUseCase.execute(
      adapter
    );

    this.setFileStorageBasePath([course]);

    return CoreApiResponse.success(course);
  }

  @Delete(":courseId")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseCourse })
  public async removeCourse(
    @HttpUser() user: HttpUserPayload,
    @Param("courseId") courseId: string
  ): Promise<CoreApiResponse<void>> {
    const adapter: RemoveCourseAdapter = await RemoveCourseAdapter.new({
      executorId: user.id,
      courseId: courseId,
    });
    await this.removeCourseUseCase.execute(adapter);

    return CoreApiResponse.success();
  }

  private setFileStorageBasePath(courses: CourseUseCaseDto[]): void {
    courses.forEach(
      (course: CourseUseCaseDto) =>
        (course.url = resolve(FileStorageConfig.BASE_PATH, course.url))
    );
  }
}

type MulterFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};
