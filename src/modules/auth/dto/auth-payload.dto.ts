import { RoleEnum, User } from "@prisma/client";
import { IsEnum } from "class-validator";

export class AuthPayloadDTO {
  avatar?: File | null | string;
  email: string;
  id: string | number;
  name: string;
  phone?: string;
  token: string;
  arbolId?: number | null;
  googleId?: string | null;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}

export class LoginResponse {
  user: User;
  token: string;
}
