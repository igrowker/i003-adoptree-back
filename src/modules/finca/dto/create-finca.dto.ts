import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFincaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ubication: string;

  @IsString()
  @IsNotEmpty()
  practicesSustainable: string;

  @IsArray()
  @IsNotEmpty()
  images: string[]

  @IsString()
  @IsNotEmpty()
  productor: string;
}
