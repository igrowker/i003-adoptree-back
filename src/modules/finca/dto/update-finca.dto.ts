import { IsNotEmpty, IsString } from "class-validator";

export class UpdateFincaDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  ubication?: string;

  @IsString()
  @IsNotEmpty()
  practicesSustainable?: string;

  images: String[]

  productor: string
}
