import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CancionDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    archivo?: string;

    @IsNotEmpty()
    albumId: number;
}
