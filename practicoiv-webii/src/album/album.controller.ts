import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./album.model";
import { AlbumDto } from "./dto/album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Multer } from "multer";
import { unlinkSync, existsSync } from "fs";

@Controller("album")
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    findAll(): Promise<Album[]> {
        return this.albumService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: number): Promise<Album> {
        return this.albumService.findById(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/albums",
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
    async createAlbum(@Body() albumDto: AlbumDto, @UploadedFile() file: Multer.File): Promise<Album> {
        if (file) {
            albumDto = { ...albumDto, imagen: `/uploads/albums/${file.filename}` };
        }
        return this.albumService.createAlbum(albumDto);
    }

    @Put(":id")
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/albums",
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
    async updateAlbum(@Param("id") id: number, @Body() albumDto: AlbumDto, @UploadedFile() file: Multer.File): Promise<Album> {
        const existingAlbum = await this.albumService.findById(id);

        if (file) {
            if (existingAlbum.imagen) {
                const imagePath = `.${existingAlbum.imagen}`;
                if (existsSync(imagePath)) {
                    unlinkSync(imagePath);
                }
            }
            albumDto = { ...albumDto, imagen: `/uploads/albums/${file.filename}` };
        } else {
            albumDto = { ...albumDto, imagen: existingAlbum.imagen };
        }

        return this.albumService.updateAlbum(id, albumDto);
    }

    @Patch(":id")
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/albums",
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
    async updateAlbumPatch(@Param("id") id: number, @Body() updateAlbumDto: UpdateAlbumDto, @UploadedFile() file: Multer.File): Promise<Album> {
        console.log("Incoming PATCH request data:", updateAlbumDto); // Log para depurar datos

        const existingAlbum = await this.albumService.findById(id);

        if (file) {
            console.log("New image uploaded:", file.filename);
            if (existingAlbum.imagen) {
                const imagePath = `.${existingAlbum.imagen}`;
                if (existsSync(imagePath)) {
                    unlinkSync(imagePath);
                }
            }
            updateAlbumDto = { ...updateAlbumDto, imagen: `/uploads/albums/${file.filename}` };
        } else {
            updateAlbumDto = { ...updateAlbumDto, imagen: existingAlbum.imagen };
        }

        console.log("Final data sent to update service:", updateAlbumDto);
        return this.albumService.updateAlbum(id, updateAlbumDto);
    }

    @Delete(":id")
    async deleteAlbum(@Param("id") id: number): Promise<{ message: string }> {
        const album = await this.albumService.findById(id);
        if (album.imagen) {
            const imagePath = `.${album.imagen}`;
            if (existsSync(imagePath)) {
                unlinkSync(imagePath);
            }
        }
        await this.albumService.deleteAlbum(id);
        return { message: "Album deleted successfully" };
    }
}
