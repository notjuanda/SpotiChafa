import { IsOptional, IsString } from "class-validator";

export class UpdateCancionDto {
    @IsOptional()
    @IsString()
    titulo?: string;

    @IsOptional()
    archivo?: string;

    @IsOptional()
    albumId?: number;
}
