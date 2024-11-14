import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { ArtistaService } from "./artista.service";
import { Artista } from "./artista.model";
import { ArtistaDto } from "./dto/artista.dto";
import { UpdateArtistaDto } from "./dto/update-artista.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Multer } from "multer";
import { unlinkSync, existsSync } from "fs";

@Controller("artista")
export class ArtistaController {
    constructor(private readonly artistaService: ArtistaService) {}

    @Get()
    findAll(): Promise<Artista[]> {
        return this.artistaService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: number): Promise<Artista> {
        return this.artistaService.findById(id);
    }

    @Get(":id/detalles")
    async findDetailedById(@Param("id") id: number): Promise<Artista> {
        return this.artistaService.findDetailedById(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/artistas",
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
    async createArtista(@Body() artistaDto: ArtistaDto, @UploadedFile() file: Multer.File): Promise<Artista> {
        if (file) {
            artistaDto = { ...artistaDto, imagen: `/uploads/artistas/${file.filename}` };
        }
        return this.artistaService.createArtista(artistaDto);
    }

    @Put(":id")
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/artistas",
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
    async updateArtista(@Param("id") id: number, @Body() artistaDto: ArtistaDto, @UploadedFile() file: Multer.File): Promise<Artista> {
        const existingArtista = await this.artistaService.findById(id);

        if (file) {
            if (existingArtista.imagen) {
                const imagePath = `.${existingArtista.imagen}`;
                if (existsSync(imagePath)) {
                    unlinkSync(imagePath);
                }
            }
            artistaDto = { ...artistaDto, imagen: `/uploads/artistas/${file.filename}` };
        } else {
            artistaDto = { ...artistaDto, imagen: existingArtista.imagen };
        }

        return this.artistaService.updateArtista(id, artistaDto);
    }

    @Patch(":id")
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/artistas",
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
    async updateArtistaPatch(@Param("id") id: number, @Body() updateArtistaDto: UpdateArtistaDto, @UploadedFile() file: Multer.File): Promise<Artista> {
        const existingArtista = await this.artistaService.findById(id);

        if (file) {
            if (existingArtista.imagen) {
                const imagePath = `.${existingArtista.imagen}`;
                if (existsSync(imagePath)) {
                    unlinkSync(imagePath);
                }
            }
            updateArtistaDto = { ...updateArtistaDto, imagen: `/uploads/artistas/${file.filename}` };
        } else {
            updateArtistaDto = { ...updateArtistaDto, imagen: existingArtista.imagen };
        }

        return this.artistaService.updateArtista(id, updateArtistaDto);
    }

    @Delete(":id")
    async deleteArtista(@Param("id") id: number): Promise<{ message: string }> {
        const artista = await this.artistaService.findById(id);
        if (artista.imagen) {
            const imagePath = `.${artista.imagen}`;
            if (existsSync(imagePath)) {
                unlinkSync(imagePath);
            }
        }
        await this.artistaService.deleteArtista(id);
        return { message: "Artista deleted successfully" };
    }
}
