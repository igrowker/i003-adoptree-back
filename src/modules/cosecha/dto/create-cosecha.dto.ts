import { EstadoDeEnvioEnum } from "@prisma/client";
import { IsDate, IsEnum, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateCosechaDto {
  @IsNumber()
  arbolId: number;

  @IsNumber()
  cantidad: number;

  @Type(() => Date)
  @IsDate()
  fechaDeEnvio: Date;

  @IsEnum(EstadoDeEnvioEnum)
  estadoDeEnvio: EstadoDeEnvioEnum;
}
