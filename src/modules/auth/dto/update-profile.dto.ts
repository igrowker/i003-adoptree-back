import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name?: string;

  @IsString()
  @MinLength(1)
  surname?: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password?: string;

  avatar: any;
}
