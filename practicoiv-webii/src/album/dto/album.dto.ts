import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class AlbumDto {
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly titulo: string;

    @IsOptional()
    readonly imagen?: string;

    @IsNotEmpty()
    readonly fechaLanzamiento: Date;

    @IsNotEmpty()
    readonly artistaId: number;
}
