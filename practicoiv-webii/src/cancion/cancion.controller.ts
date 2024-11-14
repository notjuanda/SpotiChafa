import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { CancionService } from "./cancion.service";
import { Cancion } from "./cancion.model";
import { CancionDto } from "./dto/cancion.dto";
import { UpdateCancionDto } from "./dto/update-cancion.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Multer } from "multer";
import { unlinkSync, existsSync } from "fs";

@Controller("cancion")
export class CancionController {
    constructor(private readonly cancionService: CancionService) {}

    @Get()
    findAll(): Promise<Cancion[]> {
        return this.cancionService.findAll();
    }

    @Get(":id")
    async findById(@Param("id") id: number): Promise<Cancion> {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException("Invalid ID");
        }
        return this.cancionService.findById(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("archivo", {
            storage: diskStorage({
                destination: "./uploads/canciones",
                filename: (req, file, callback) => {
                    const extension = file.originalname.split(".").pop();
                    const filename = `${Date.now()}.${extension}`;
                    callback(null, filename);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.includes("audio/mpeg")) {
                    callback(new BadRequestException("Only MP3 files are allowed!"), false);
                } else {
                    callback(null, true);
                }
            },
        }),
    )
    async createCancion(@Body() cancionDto: CancionDto, @UploadedFile() file: Multer.File): Promise<Cancion> {
        if (file) {
            cancionDto = { ...cancionDto, archivo: `/uploads/canciones/${file.filename}` };
        }
        return this.cancionService.createCancion(cancionDto);
    }

    @Put(":id")
    @UseInterceptors(
        FileInterceptor("archivo", {
            storage: diskStorage({
                destination: "./uploads/canciones",
                filename: (req, file, callback) => {
                    const extension = file.originalname.split(".").pop();
                    const filename = `${Date.now()}.${extension}`;
                    callback(null, filename);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.includes("audio/mpeg")) {
                    callback(new BadRequestException("Only MP3 files are allowed!"), false);
                } else {
                    callback(null, true);
                }
            },
        }),
    )
    async updateCancion(@Param("id") id: number, @Body() cancionDto: CancionDto, @UploadedFile() file: Multer.File): Promise<Cancion> {
        const existingCancion = await this.cancionService.findById(id);

        if (file) {
            if (existingCancion.archivo) {
                const archivoPath = `.${existingCancion.archivo}`;
                if (existsSync(archivoPath)) {
                    unlinkSync(archivoPath);
                }
            }
            cancionDto.archivo = `/uploads/canciones/${file.filename}`;
        } else {
            cancionDto.archivo = existingCancion.archivo;
        }

        return this.cancionService.updateCancion(id, cancionDto);
    }

    @Patch(":id")
    @UseInterceptors(
        FileInterceptor("archivo", {
            storage: diskStorage({
                destination: "./uploads/canciones",
                filename: (req, file, callback) => {
                    const extension = file.originalname.split(".").pop();
                    const filename = `${Date.now()}.${extension}`;
                    callback(null, filename);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.includes("audio/mpeg")) {
                    callback(new BadRequestException("Only MP3 files are allowed!"), false);
                } else {
                    callback(null, true);
                }
            },
        }),
    )
    async updateCancionPatch(@Param("id") id: number, @Body() updateCancionDto: UpdateCancionDto, @UploadedFile() file: Multer.File): Promise<Cancion> {
        const existingCancion = await this.cancionService.findById(id);

        if (file) {
            if (existingCancion.archivo) {
                const archivoPath = `.${existingCancion.archivo}`;
                if (existsSync(archivoPath)) {
                    unlinkSync(archivoPath);
                }
            }
            updateCancionDto.archivo = `/uploads/canciones/${file.filename}`;
        } else {
            updateCancionDto.archivo = existingCancion.archivo;
        }

        return this.cancionService.updateCancion(id, updateCancionDto);
    }

    @Delete(":id")
    async deleteCancion(@Param("id") id: number): Promise<{ message: string }> {
        const cancion = await this.cancionService.findById(id);
        if (cancion.archivo) {
            const archivoPath = `.${cancion.archivo}`;
            if (existsSync(archivoPath)) {
                unlinkSync(archivoPath);
            }
        }
        await this.cancionService.deleteCancion(id);
        return { message: "Cancion deleted successfully" };
    }
}
