// src/modules/users/dto/create-user.dto.ts

import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

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
  avatar?: any;
}