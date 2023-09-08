import { UserRole } from "@core/common/enums/UserEnums";

export interface EditUserPort {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
