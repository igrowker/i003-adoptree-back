import { StatusTreeEnum } from "@prisma/client"; // Importa el enum desde Prisma
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateArbolDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsInt()
  @IsOptional()
  fincaId?: number;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsEnum(StatusTreeEnum)
  @IsOptional()
  statusTree?: StatusTreeEnum;
}
