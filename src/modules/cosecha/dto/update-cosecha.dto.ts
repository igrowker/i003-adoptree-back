import { EstadoDeEnvioEnum } from "@prisma/client";
import { IsDate, IsEnum, IsNumber } from "class-validator";

export class UpdateCosechaDto {
  @IsNumber()
  cantidad: number;

  @IsDate()
  fechaDeEnvio: Date;

  @IsEnum(EstadoDeEnvioEnum)
  estadoDeEnvio: EstadoDeEnvioEnum;
}
