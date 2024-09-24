import { IsNotEmpty, IsString, IsOptional, IsInt, IsIn, IsEnum } from "class-validator";

export class CreateImageDto {
    @IsString()
    url: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    
}