import { HttpAuth } from "@application/api/http-rest/auth/decorator/HttpAuth";
import { HttpUser } from "@application/api/http-rest/auth/decorator/HttpUser";
import { HttpUserPayload } from "@application/api/http-rest/auth/type/HttpAuthTypes";
import { HttpRestApiModelCreateUserBody } from "@application/api/http-rest/controller/documentation/user/HttpRestApiModelCreateUserBody";
import { HttpRestApiResponseUser } from "@application/api/http-rest/controller/documentation/user/HttpRestApiResponseUser";
import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { UserRole } from "@core/common/enums/UserEnums";
import { UserDITokens } from "@core/domain/user/di/UserDITokens";
import { CreateUserUseCase } from "@core/domain/user/usecase/CreateUserUseCase";
import { UserUseCaseDto } from "@core/domain/user/usecase/dto/UserUseCaseDto";
import { GetUserUseCase } from "@core/domain/user/usecase/GetUserUseCase";
import { EditUserUseCase } from "@core/domain/user/usecase/EditUserUseCase";
import { CreateUserAdapter } from "@infrastructure/adapter/usecase/user/CreateUserAdapter";
import { GetUserAdapter } from "@infrastructure/adapter/usecase/user/GetUserAdapter";
import { EditUserAdapter } from "@infrastructure/adapter/usecase/user/EditUserAdapter";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
  Param,
  Req,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpRestApiEditUser } from "./documentation/user/HttpRestApiEditUser";

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(UserDITokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,

    @Inject(UserDITokens.EditUserUseCase)
    private readonly editUserUseCase: EditUserUseCase
  ) {}

  @Post("account")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelCreateUserBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  public async createAccount(
    @Body() body: HttpRestApiModelCreateUserBody
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role,
      password: body.password,
    });

    const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(
      adapter
    );

    return CoreApiResponse.success(createdUser);
  }

  @Get("me")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @HttpAuth(UserRole.AUTHOR, UserRole.ADMIN, UserRole.GUEST, UserRole.STUDENT)
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  public async getMe(
    @HttpUser() httpUser: HttpUserPayload
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: GetUserAdapter = await GetUserAdapter.new({
      userId: httpUser.id,
    });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return CoreApiResponse.success(user);
  }

  @Put("edit/:userId")
  @HttpAuth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiEditUser })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  public async editUser(
    // @HttpUser() user: HttpUserPayload,
    @HttpUser() user: HttpUserPayload,
    @Body() body: HttpRestApiEditUser,
    @Param("userID") userID: string
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: EditUserAdapter = await EditUserAdapter.new({
      id: user.id,
      firstName: String(body.firstName),
      lastName: String(body.lastName),
      email: String(body.email),
      password: String(body.password),
    });

    console.log("COMPLETE ADAPTER FROM PUT IS::", adapter);

    const edited: UserUseCaseDto = await this.editUserUseCase.execute(adapter);

    return CoreApiResponse.success(edited);
  }
}
