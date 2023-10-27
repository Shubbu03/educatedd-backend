import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UseCaseValidatableAdapter";
import { UserRole } from "@core/common/enums/UserEnums";
import { EditUserPort } from "@core/domain/user/port/usecase/EditUserPort";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsString, IsEmail, IsUUID } from "class-validator";

@Exclude()
export class EditUserAdapter
  extends UseCaseValidatableAdapter
  implements EditUserPort
{
  @Expose()
  @IsString()
  public id: string;

  @Expose()
  @IsString()
  public firstName: string;

  @Expose()
  @IsString()
  public lastName: string;

  @Expose()
  @IsString()
  public email: string;

  @Expose()
  @IsString()
  public password: string;


  public static async new(payload: EditUserPort): Promise<EditUserAdapter> {
    const adapter: EditUserAdapter = plainToClass(EditUserAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
}
