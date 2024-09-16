import { EstadoDeEnvioEnum } from "@prisma/client";
import { IsDate, IsEnum, IsNumber } from "class-validator";

export class CreateCosechaDto {
  @IsNumber()
  arbolId: number;

  @IsNumber()
  cantidad: number;

  @IsDate()
  fechaDeEnvio: Date;

  @IsEnum(EstadoDeEnvioEnum)
  estadoDeEnvio: EstadoDeEnvioEnum;
}
