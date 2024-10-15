import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class ProductorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsNumber()
  @IsOptional()
  experiencia?: number;

  @IsString()
  @IsOptional()
  especialidad?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certificaciones?: string[];
}

export class UpdateFincaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ubication?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  practicesSustainable?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ValidateNested()
  @Type(() => ProductorDto)
  @IsOptional()
  productor?: ProductorDto;
}
