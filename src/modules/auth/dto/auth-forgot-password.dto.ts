import { IsString } from "class-validator";

export class AuthForgotPasswordDto {
  @IsString()
  email!: string;
}
