import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ArtistaDto {
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    readonly imagen?: string;

    @IsNotEmpty()
    readonly generoId: number;
}
