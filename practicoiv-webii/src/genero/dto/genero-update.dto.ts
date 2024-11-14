import { IsOptional, IsString } from "class-validator";

export class GeneroUpdateDto {
    @IsOptional()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    readonly imagen?: string;
}
