import { IsString, IsOptional } from "class-validator";

export class CreateImageDto {
    @IsString()
    url: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    
}