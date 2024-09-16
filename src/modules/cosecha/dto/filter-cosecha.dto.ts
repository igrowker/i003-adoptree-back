import { IsNumber } from "class-validator";

export class FilterCosechaDto {
  @IsNumber()
  arbolId: number;
}
