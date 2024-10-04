import { StatusTreeEnum } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsString, IsArray } from "class-validator";

export class CreateArbolDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsNotEmpty()
  fincaId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsEnum(StatusTreeEnum)
  @IsNotEmpty()
  statusTree: StatusTreeEnum;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  @IsNotEmpty()
  price: string;
}
