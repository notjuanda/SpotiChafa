import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { GeneroService } from "./genero.service";
import { Genero } from "./genero.model";
import { GeneroDto } from "./dto/genero.dto";
import { GeneroUpdateDto } from "./dto/genero-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Multer } from "multer";
import { unlinkSync, existsSync } from "fs";
import { join } from "path";

@Controller("genero")
export class GeneroController {
    constructor(private readonly generoService: GeneroService) {}

    @Get()
    findAll(): Promise<Genero[]> {
        return this.generoService.findAll();
    }

    @Get(":id")
    async findById(@Param("id") id: number): Promise<Genero> {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException("Invalid ID");
        }
        return this.generoService.findById(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/generos",
                filename: (req, file, callback) => {
                    const extension = file.originalname.split(".").pop();
                    const filename = `${Date.now()}.${extension}`;
                    callback(null, filename);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    callback(new BadRequestException("Only image files are allowed!"), false);
                }
                callback(null, true);
            },
        }),
    )
    async createGenero(@Body() generoDto: GeneroDto, @UploadedFile() file: Multer.File): Promise<Genero> {
        if (file) {
            generoDto = { ...generoDto, imagen: `/uploads/generos/${file.filename}` };
        }
        const genero: Genero = { ...generoDto, id: null, artistas: [], imagen: generoDto.imagen || "" };
        return this.generoService.createGenero(genero);
    }

    @Put(":id")
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/generos",
                filename: (req, file, callback) => {
                    const extension = file.originalname.split(".").pop();
                    const filename = `${Date.now()}.${extension}`;
                    callback(null, filename);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    callback(new BadRequestException("Only image files are allowed!"), false);
                }
                callback(null, true);
            },
        }),
    )
    async updateGenero(@Param("id") id: number, @Body() generoDto: GeneroDto, @UploadedFile() file: Multer.File): Promise<Genero> {
        const genero = await this.generoService.findById(id);
        if (!genero) {
            throw new BadRequestException("Genero not found");
        }

        const oldImagePath = genero.imagen ? join(__dirname, "../../..", genero.imagen) : null;

        if (file) {
            generoDto = { ...generoDto, imagen: `/uploads/generos/${file.filename}` };
        } else {
            generoDto = { ...generoDto, imagen: genero.imagen };
        }

        const updatedGenero = await this.generoService.updateGenero(id, generoDto);

        if (oldImagePath && file && existsSync(oldImagePath)) {
            unlinkSync(oldImagePath);
        }

        return updatedGenero;
    }

    @Patch(":id")
    async updateGeneroPatch(@Param("id") id: number, @Body() generoUpdateDto: GeneroUpdateDto): Promise<Genero> {
        return this.generoService.updateGenero(id, generoUpdateDto);
    }

    @Delete(":id")
    async deleteGenero(@Param("id") id: number): Promise<{ message: string }> {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException("Invalid ID");
        }
        const genero = await this.generoService.findById(id);

        if (genero && genero.imagen) {
            const imagePath = join(__dirname, "../../..", genero.imagen);
            if (existsSync(imagePath)) {
                unlinkSync(imagePath);
            }
        }

        await this.generoService.deleteGenero(id);
        return { message: "Genero deleted successfully" };
    }
}
