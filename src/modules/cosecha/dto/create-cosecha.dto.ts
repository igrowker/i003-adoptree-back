import { EstadoDeEnvioEnum } from "@prisma/client";
import { IsDateString, IsEnum, IsNumber } from "class-validator";

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
