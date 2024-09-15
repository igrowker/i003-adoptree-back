import { RoleEnum } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  direccionEnvio: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}
