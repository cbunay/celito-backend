import { Role } from "../../../modules/auth/constants";

export class CreateUserDto {
  username: string;
  password: string;
  role: Role;
}
