import { IsOptional, IsString } from "class-validator";

export class UpdateArtistaDto {
    @IsOptional()
    @IsString()
    readonly nombre?: string;

    @IsOptional()
    readonly imagen?: string;

    @IsOptional()
    readonly generoId?: number;
}
