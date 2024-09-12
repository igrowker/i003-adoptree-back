import { RoleEnum } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  surname: string;
  direccionEnvio: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}
