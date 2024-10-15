import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  unit_price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
