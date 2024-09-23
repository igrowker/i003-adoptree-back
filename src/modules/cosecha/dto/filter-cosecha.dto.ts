import { EstadoDeEnvioEnum } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class FilterCosechaDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  arbolId?: number;

  @IsEnum(EstadoDeEnvioEnum)
  estadoDeEnvio?: EstadoDeEnvioEnum;
}
