import { IsInt, IsOptional } from "class-validator";

export class FindArbolDto {
  @IsInt()
  @IsOptional()
  id?: number;
}
