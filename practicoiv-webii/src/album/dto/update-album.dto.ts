import { IsOptional, IsString } from "class-validator";

export class UpdateAlbumDto {
    @IsOptional()
    @IsString()
    readonly titulo?: string;

    @IsOptional()
    @IsString()
    readonly imagen?: string;

    @IsOptional()
    readonly fechaLanzamiento?: Date;

    @IsOptional()
    readonly artistaId?: number;
}
