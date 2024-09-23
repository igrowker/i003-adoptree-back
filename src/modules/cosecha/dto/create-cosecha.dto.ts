import { EstadoDeEnvioEnum } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class CreateCosechaDto {
  @IsNumber()
  arbolId: number;

  @IsNumber()
  cantidad: number;

  @IsDateString()
  fechaDeEnvio: Date;

  @IsEnum(EstadoDeEnvioEnum)
  estadoDeEnvio: EstadoDeEnvioEnum;
}
