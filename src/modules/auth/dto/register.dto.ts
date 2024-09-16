import { RoleEnum } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  surname!: string;

  @IsEmail()
  email!: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  direccionEnvio: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
  avatar: any;
}
