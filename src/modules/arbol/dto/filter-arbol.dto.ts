import { StatusTreeEnum } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class ArbolFilterDto {
  @IsOptional()
  @IsInt()
  fincaId?: number;

  @IsOptional()
  @IsEnum(StatusTreeEnum)
  active?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}
