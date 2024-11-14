import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class GeneroDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    readonly imagen?: string;
}
