import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterCosechaDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  arbolId?: number;
}