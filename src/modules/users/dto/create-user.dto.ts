// src/modules/users/dto/create-user.dto.ts

import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  direccionEnvio: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsOptional()
  avatar?: "" | null;
}
