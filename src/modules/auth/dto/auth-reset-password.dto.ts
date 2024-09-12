import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class AuthResetPasswordDto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(6)
  email!: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  code: string;
}
